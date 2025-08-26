import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../libs/firebase/config";

const UseLecturerData = (uid) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, "Lecturer", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  return { userData, loading, error };
};

export default UseLecturerData;
