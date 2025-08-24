export default function AgentTasksView({ data = [] }) {

  if (!data.length)
    return (
      <p className="text-sm text-gray-500 italic bg-white/50 rounded-lg p-4 shadow">
        No tasks yet.
      </p>
    );

  return (

    <div className="max-h-[480px] overflow-auto space-y-6">
      {data.map((g) => (
        <div
          key={g.agent.id}
          className="bg-white/80 backdrop-blur-sm shadow-md rounded-xl overflow-hidden"
        >

          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-3">

            <div>
              <h4 className="text-lg font-semibold">{g.agent.name}</h4>
              <p className="text-xs text-indigo-100">{g.agent.email}</p>
            </div>

            <span className="px-3 py-1 text-xs bg-white/20 rounded-full">
              {g.tasks.length} {g.tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left font-medium">First Name</th>
                  <th className="p-2 text-left font-medium">Phone</th>
                  <th className="p-2 text-left font-medium">Notes</th>
                  <th className="p-2 text-left font-medium">Assigned At</th>
                </tr>
              </thead>
              
              <tbody>
                {g.tasks.map((t) => (
                  <tr
                    key={t._id}
                    className="border-t border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="p-2">{t.firstName}</td>
                    <td className="p-2">{t.phone}</td>
                    <td className="p-2">{t.notes}</td>
                    <td className="p-2 text-gray-600">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
