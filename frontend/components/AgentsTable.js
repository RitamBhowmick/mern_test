export default function AgentsTable({ agents = [] }) {

  return (

    <div className="overflow-x-auto rounded-xl shadow">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Email</th>
            <th className="p-3 font-semibold">Mobile</th>
            <th className="p-3 font-semibold">Created Date and Time</th>
          </tr>
        </thead>
        
        <tbody className="bg-white/70 backdrop-blur-sm">
          {agents.length > 0 ? (
            agents.map((a) => (
              <tr
                key={a._id}
                className="border-b border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3">{a.mobile}</td>
                <td className="p-3 text-gray-600">
                  {new Date(a.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="p-4 text-center text-gray-500 italic"
              >
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
