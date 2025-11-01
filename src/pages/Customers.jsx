export default function Customers() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>

      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-64" placeholder="Search customers..." />
        <button className="bg-blue-700 text-white px-3 py-2 rounded">Add Customer</button>
      </div>

      <table className="w-full border bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Last Purchase</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border p-2">John Doe</td>
            <td className="border p-2">+91 9876541230</td>
            <td className="border p-2">john@example.com</td>
            <td className="border p-2">01/11/2025</td>
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
