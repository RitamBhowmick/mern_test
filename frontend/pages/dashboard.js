import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Protected from "../components/Protected";
import AgentsForm from "../components/AgentsForm";
import AgentsTable from "../components/AgentsTable";
import UploadDistribute from "../components/UploadDistribute";
import AgentTasksView from "../components/AgentTasksView";
import { api } from "../lib/api";

export default function Dashboard() {
  
  const r = useRouter();
  const [agents, setAgents] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchAgents = async () => {
    setAgents(await api.listAgents());
  }

  const fetchGroups = async () => {
    setGroups(await api.distributed());
  }

  useEffect(() => {
    fetchAgents();
    fetchGroups();
  }, []);

  const logout = () => {
    localStorage.clear();
    r.replace("/login");
  };

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-50 to-cyan-100 p-8 space-y-10">
        <div className="bg-white/80 backdrop-blur-md shadow-md rounded-xl px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
            🚀 Dashboard
          </h2>

          <div className="flex items-center space-x-6">
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="bg-green-50 border-l-4 border-green-500 shadow-md rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                ➕ Add Agent
              </h3>
              <AgentsForm onCreated={fetchAgents} />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 shadow-md rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                👥 Agents
              </h3>
              <AgentsTable agents={agents} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-purple-50 border-l-4 border-purple-500 shadow-md rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">
                ⬆️ Upload & Distribute
              </h3>
              <UploadDistribute
                onDone={() => {
                  fetchAgents();
                  fetchGroups();
                }}
              />
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4 flex items-center">
                📌 Distributed Tasks
              </h3>
              <AgentTasksView data={groups} />
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}
