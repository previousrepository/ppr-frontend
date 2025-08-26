import { useState, useEffect, createContext } from "react";
import { auth, db } from "../libs/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const studentRef = doc(db, "Student", user.uid);
        const lecturerRef = doc(db, "Lecturer", user.uid);

        const studentSnap = await getDoc(studentRef);
        const lecturerSnap = await getDoc(lecturerRef);

        let userRole;
        if (studentSnap.exists()) userRole = "student";
        if (lecturerSnap.exists()) userRole = "lecturer";

        setCurrentUser(user);
        setRole(userRole);
      } catch (err) {
        console.error("Error fetching user role:", err);
        // setRole("guest");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
