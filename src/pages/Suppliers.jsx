export default function Suppliers() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Suppliers</h1>

      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-64" placeholder="Search suppliers..." />
        <button className="bg-blue-700 text-white px-3 py-2 rounded">Add Supplier</button>
      </div>

      <table className="w-full border bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border p-2">MediSource Pvt Ltd</td>
            <td className="border p-2">+91 9876543210</td>
            <td className="border p-2">info@medisource.com</td>
            <td className="border p-2">Kochi, Kerala</td>
            <td className="border p-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
