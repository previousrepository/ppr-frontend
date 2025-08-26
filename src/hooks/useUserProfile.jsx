import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../libs/firebase/config";
import { useAuth } from "./useAuth";

const useUserProfile = () => {
  const { currentUser, role } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !role) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const collection = role === "student" ? "Student" : "Lecturer";
        const docRef = doc(db, collection, currentUser.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, role]);

  const updateProfile = async (updates) => {
    if (!currentUser || !role) return;

    const collection = role === "student" ? "Student" : "Lecturer";
    const docRef = doc(db, collection, currentUser.uid);

    await updateDoc(docRef, updates);
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return { profile, loading, updateProfile };
};

export default useUserProfile;