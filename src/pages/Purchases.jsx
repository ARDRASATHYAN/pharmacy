export default function Purchases() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Purchases</h1>

      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-64" placeholder="Search purchase..." />
        <button className="bg-blue-700 text-white px-3 py-2 rounded">Add Purchase</button>
      </div>

      <table className="w-full border bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Purchase ID</th>
            <th className="p-2 border">Supplier</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Total Amount</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border p-2">PUR-001</td>
            <td className="border p-2">MediSource Pvt Ltd</td>
            <td className="border p-2">31/10/2025</td>
            <td className="border p-2">₹12,540</td>
            <td className="border p-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">View</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
