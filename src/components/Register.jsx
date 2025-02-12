import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); // พิ่ม state สำหรับแสดงสถานะโหลด
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // เริ่มโหลด
    try {
      await signUp(formData.email, formData.password);
      alert("✅ สมัครสมาชิกสำเร็จ!");
      navigate("/login");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("❌ อีเมลนี้ถูกใช้ไปแล้ว กรุณาใช้เมลอื่น");
          break;
        case "auth/weak-password":
          setError("❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
          break;
        case "auth/invalid-email":
          setError("❌ อีเมลไม่ถูกต้อง กรุณาตรวจสอบ");
          break;
        default:
          setError("❌ เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    }
    setLoading(false); // หยุดโหลด
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">สมัครสมาชิก</h2>
        
        {/*  แสดงข้อความข้อผิดพลาด */}
        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

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
          {loading ? "⏳ กำลังสมัคร..." : "📌 สมัครสมาชิก"}
        </button>
      </form>
    </div>
  );
}

export default Register;
