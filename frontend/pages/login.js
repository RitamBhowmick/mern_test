import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "../lib/api";

export default function Login() {

  const { register, handleSubmit } = useForm();
  const r = useRouter();

  const onSubmit = async (values) => {
    try {

      const { token, user } = await api.login(values.email, values.password);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Logged in");
      r.replace("/dashboard");
      
    } catch (e) {
      toast.error(e.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => r.push("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
