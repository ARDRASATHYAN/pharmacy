export default function Medicines() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Medicines</h1>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-64" placeholder="Search medicine..." />
        <button className="bg-blue-700 text-white px-3 py-2 rounded">Add Medicine</button>
      </div>
      <table className="w-full border bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Expiry</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border p-2">Paracetamol</td>
            <td className="border p-2">Acme</td>
            <td className="border p-2">₹45</td>
            <td className="border p-2">120</td>
            <td className="border p-2">12/2025</td>
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
