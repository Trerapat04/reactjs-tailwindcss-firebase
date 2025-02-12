import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); // ✅ เพิ่ม state โหลด
  const { login } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ เริ่มโหลด

    try {
      const userCredential = await login(formData.email, formData.password);
      localStorage.setItem("user", JSON.stringify(userCredential.user)); // ✅ เก็บข้อมูล login
      alert("✅ เข้าสู่ระบบสำเร็จ!");
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("❌ ไม่พบบัญชีนี้ในระบบ");
          break;
        case "auth/wrong-password":
          setError("❌ รหัสผ่านไม่ถูกต้อง");
          break;
        case "auth/invalid-credential":
          setError("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
          break;
        default:
          setError("❌ เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    }

    setLoading(false); // ✅ หยุดโหลด
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">เข้าสู่ระบบ</h2>

        {/* ✅ แสดงข้อความ error เป็นภาษาไทย */}
        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

        {/* ✅ ขอบ input เป็นสีแดงถ้ามี error */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="📧 อีเมล"
          className={`w-full p-2 border rounded-lg mb-4 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="🔒 รหัสผ่าน"
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
          {loading ? "⏳ กำลังเข้าสู่ระบบ..." : "🔑 เข้าสู่ระบบ"}
        </button>
      </form>
    </div>
  );
}

export default Login;
