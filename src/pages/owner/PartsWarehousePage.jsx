import { useDeletePart, useFullParts } from "@/app/hooks/useParts";
import { partTableSchema } from "@/app/tables/partTableSchema";
import { DataTable } from "@/components/DataTable";
import { DeleteModal } from "@/components/DeleteModal";
import { EditModal } from "@/components/EditModal";
import { PartForm } from "@/components/owner/PartForm";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export function PartsWarehousePage() {
  const Parts = useFullParts();
  const DeletePart = useDeletePart();
  
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [selectedPartId, setSelectedPartId] = useState(0)
  const [selectedPart, setSelectedPart] = useState({})

  const openDeleteModal = (id) => {
    setSelectedPartId(id)

    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  }
  const confirmDeletePart = (id) => {
    if (id) {
      DeletePart.mutate(id)
    }
  }

  const openEditModal = (object) => {
    setSelectedPart(object)

    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
  }


    if (Parts.isLoading) {
    return (
      <>
        <Spinner /> Loading
      </>
    )
  }

  if (Parts.error) {
    return (
      <>
        <p>An error has occured</p>
        <p className="text-red-600">{Parts.error}</p>
      </>
    )
  }

  return (
    <main className="flex w-full justify-center p-10">
        <DataTable
          columns={partTableSchema({ onEdit: openEditModal, onDelete: openDeleteModal })}
          data={Parts.catalog}
          filterColumn="name"
          showSelected={false}
        />

        <DeleteModal modalOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDeletePart} objectId={selectedPartId} />
        <EditModal className="sm:max-w-[880px] max-h-[90vh] flex flex-col" modalOpen={isEditModalOpen} onClose={closeEditModal} Form={<PartForm partId={selectedPart.id} part={selectedPart} onClose={closeEditModal} />} />
    </main>
  );
}
