import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4 text-blue-700">Login to PharmaPro</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="bg-blue-700 text-white w-full py-2 rounded hover:bg-blue-800">
          Login
        </button>
      </div>
    </div>
  );
}
