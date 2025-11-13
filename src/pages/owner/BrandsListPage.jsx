import { useBrands, useDeleteBrand } from "@/app/hooks/useBrands";
import { brandTableSchema } from "@/app/tables/brandTableSchema";
import { DataTable } from "@/components/DataTable";
import { DeleteModal } from "@/components/DeleteModal";
import { EditBrandModal } from "@/components/EditBrandModal";
import { CreateBrandForm } from "@/components/owner/CreateBrandForm";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export function BrandsListPage() {
  const Brands = useBrands();
  const DeleteBrand = useDeleteBrand();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [selectedBrandId, setSelectedBrandId] = useState(0)
  const [selectedBrand, setSelectedBrand] = useState({})

  const openDeleteModal = (id) => {
    setSelectedBrandId(id)

    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  }
  const confirmDeleteBrand = (id) => {
    if (id) {
      DeleteBrand.mutate(id)
    }
  }

  const openEditModal = (object) => {
    setSelectedBrand(object)

    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
  }

  if (Brands.isLoading) {
    return (
      <>
        <Spinner /> Loading
      </>
    )
  }

  if (Brands.error) {
    return (
      <>
        <p>An error has occured</p>
        <p className="text-red-600">{Brands.error}</p>
      </>
    )
  }

  return (
    <main className="flex w-full justify-center p-10">
      <DataTable
        columns={brandTableSchema({ onEdit: openEditModal, onDelete: openDeleteModal })}
        data={Brands.brands}
        filterColumn="name"
        showSelected={false}
      />

      <DeleteModal modalOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDeleteBrand} objectId={selectedBrandId} />
      <EditBrandModal modalOpen={isEditModalOpen} onClose={closeEditModal} Form={<CreateBrandForm brandId={selectedBrand.id} brand={selectedBrand} onClose={closeEditModal} />} />
    </main>
  );
}