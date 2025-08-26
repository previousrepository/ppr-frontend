import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../libs/firebase/config";
import { useAuth } from "./useAuth";
import useUserData from "./useStudentData";

const useStudentProjects = () => {
  const { currentUser } = useAuth();
  const [ drafts, setDrafts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { userData } = useUserData(currentUser?.uid);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!userData?.department || !userData?.studentId) return;

      try {
        const colRef = collection(
          db,
          "Projects",
          userData?.department,
          "projectSubmissions"
        );
        const q = query(
          colRef,
          where("submittedBy", "==", userData?.studentId),
          where("status", "in", ["draft", "rejected", "pending"])
        );

        const snapshot = await getDocs(q);
        const draftData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrafts(draftData);
      } catch (error) {
        console.error("Error fetching drafts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [userData?.department, userData?.studentId]);

  return { drafts, loading };
};

export default useStudentProjects;
