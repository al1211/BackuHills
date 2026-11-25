import InventoryManager from "@/components/admin/inventryManger/InventryManager";

export default function InventoryPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Inventory
      </h1>

      <InventoryManager />
    </div>
  );
}