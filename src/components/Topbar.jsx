export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 h-[72.8px] flex justify-between items-center px-6 ">
      <h2 className="text-lg font-semibold text-gray-700">
        Pharmacy Management
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition">
          Logout
        </button>
      </div>
    </header>
  );
}
