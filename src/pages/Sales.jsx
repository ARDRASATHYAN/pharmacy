export default function Sales() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sales / Billing</h1>
      <button className="bg-blue-700 text-white px-3 py-2 rounded mb-4">Create New Invoice</button>
      <table className="w-full border bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Invoice ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border p-2">INV-001</td>
            <td className="border p-2">John Doe</td>
            <td className="border p-2">01/11/2025</td>
            <td className="border p-2">₹520</td>
            <td className="border p-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded">Print</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
