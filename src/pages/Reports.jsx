export default function Reports() {
  const reports = [
    { title: "Daily Sales", value: "₹5,240" },
    { title: "Low Stock Medicines", value: 8 },
    { title: "Expired Items", value: 3 },
    { title: "Total Revenue (Monthly)", value: "₹1,42,000" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {reports.map((r, i) => (
          <div key={i} className="bg-white rounded shadow p-4 border">
            <p className="text-gray-600">{r.title}</p>
            <p className="text-2xl font-bold text-blue-700 mt-2">{r.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3">Sales Report (Last 7 Days)</h2>
      <table className="w-full border bg-white rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Total Sales</th>
            <th className="p-2 border">Invoices</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border p-2">01/11/2025</td>
            <td className="border p-2">₹5,240</td>
            <td className="border p-2">12</td>
          </tr>
          <tr className="text-center">
            <td className="border p-2">31/10/2025</td>
            <td className="border p-2">₹6,120</td>
            <td className="border p-2">15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
