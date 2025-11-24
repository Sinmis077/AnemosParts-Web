import { useDeleteModel, useModels } from "@/app/hooks/useModels";
import { modelTableSchema } from "@/app/tables/modelTableSchema";
import { DataTable } from "@/components/DataTable";
import { DeleteModal } from "@/components/DeleteModal";
import { EditModal } from "@/components/EditModal";
import { ModelForm } from "@/components/owner/ModelForm";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export function ModelsListPage() {
  const Models = useModels();
  const DeleteModel = useDeleteModel();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [selectedModelId, setSelectedModelId] = useState(0)
  const [selectedModel, setSelectedModel] = useState({})

  const openDeleteModal = (id) => {
    setSelectedModelId(id)

    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  }
  const confirmDeleteModel = (id) => {
    if (id) {
      DeleteModel.mutate(id)
    }
  }

  const openEditModal = (object) => {
    setSelectedModel(object)

    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
  }

  if (Models.isLoading) {
    return (
      <>
        <Spinner /> Loading
      </>
    )
  }

  if (Models.error) {
    return (
      <>
        <p>An error has occured</p>
        <p className="text-red-600">{Models.error}</p>
      </>
    )
  }

  return (
    <main className="flex w-full justify-center p-10">
        <DataTable
          columns={modelTableSchema({ onEdit: openEditModal, onDelete: openDeleteModal })}
          data={Models.models}
          filterColumn="name"
          showSelected={false}
        />

        <DeleteModal modalOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDeleteModel} objectId={selectedModelId} />
        <EditModal modalOpen={isEditModalOpen} onClose={closeEditModal} Form={<ModelForm modelId={selectedModel.id} model={selectedModel} onClose={closeEditModal} />} />
    </main>
  );
}