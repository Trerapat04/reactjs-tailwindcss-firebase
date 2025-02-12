import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

// ❌ แก้ไขชื่อ Context ให้ถูกต้อง
const UserAuthContext = createContext(); // ✅ ใช้ชื่อ Context ที่ถูกต้อง

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // ✅ ค่าเริ่มต้นเป็น `null`

  // ✅ ฟังก์ชันสมัครสมาชิกที่ถูกต้อง
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // ✅ ฟังก์ชันเข้าสู่ระบบที่ถูกต้อง
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // ✅ ฟังก์ชันออกจากระบบ
  function logOut() {
    return signOut(auth);
  }

  // ✅ ตรวจจับการเปลี่ยนแปลงสถานะผู้ใช้
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed: ", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, login, signUp, logOut }}>
      {children}
    </UserAuthContext.Provider>
  );
}

// ✅ ฟังก์ชันที่ให้ Component อื่นใช้ Context นี้
export function useUserAuth() {
  return useContext(UserAuthContext);
}
