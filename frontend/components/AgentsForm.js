import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "../lib/api";

export default function AgentsForm({ onCreated }) {
  
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    try {
      await api.createAgent(values);
      toast.success("Agent created");
      reset();
      onCreated?.();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white/60 p-4 rounded-xl shadow-sm"
    >
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Name"
        {...register("name", { required: true })}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Email"
        type="email"
        {...register("email", { required: true })}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Mobile (+country code)"
        {...register("mobile", { required: true })}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
      >
        Add Agent
      </button>
    </form>
  );
}
