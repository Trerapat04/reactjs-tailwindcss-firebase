import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, logOut } = useUserAuth(); // ✅ ดึง logOut มาด้วย
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(formData.email, formData.password);
      await logOut(); // ✅ ออกจากระบบหลังสมัครเสร็จ
      alert("✅ Registration successful! Please log in.");
      navigate("/login"); // ✅ ส่งไปหน้า Login
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("❌ This email is already in use. Please use a different email.");
          break;
        case "auth/weak-password":
          setError("❌ Password must be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("❌ Invalid email. Please check your input.");
          break;
        default:
          setError("❌ An error occurred. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Sign Up</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="📧 Email"
          className="w-full p-2 border rounded-lg mb-4 border-gray-300"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="🔒 Password"
          className="w-full p-2 border rounded-lg mb-6 border-gray-300"
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
          {loading ? "⏳ Signing up..." : "📌 Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Register;
