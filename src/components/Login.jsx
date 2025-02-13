import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const { login } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ Start loading

    try {
      const userCredential = await login(formData.email, formData.password);
      localStorage.setItem("user", JSON.stringify(userCredential.user)); // ✅ Store user data
      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("❌ No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("❌ Incorrect password.");
          break;
        case "auth/invalid-credential":
          setError("❌ Invalid email or password.");
          break;
        default:
          setError("❌ An error occurred. Please try again.");
      }
    }

    setLoading(false); // ✅ Stop loading
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Login</h2>

        {/* ✅ Show error messages */}
        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

        {/* ✅ Change border color if there's an error */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="📧 Email"
          className={`w-full p-2 border rounded-lg mb-4 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="🔒 Password"
          className={`w-full p-2 border rounded-lg mb-6 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        <button
          type="submit"
          className={`w-full font-bold py-2 px-4 rounded-lg transition ${
            loading || !formData.email || !formData.password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? "⏳ Logging in..." : "🔑 Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
