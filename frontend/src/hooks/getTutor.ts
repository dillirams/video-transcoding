import { useEffect, useState } from "react";
import axios from "axios";

interface Tutor {
  id: string;
  name: string;
  email: string;
}

export function useGetTutor() {
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTutor() {
      try {
        const res = await axios.get(
          "http://localhost:3000/v1/api/tutorDetail",
          {
            withCredentials: true,
          }
        );

        setTutor(res.data.tutor);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTutor();
  }, []);

  return { tutor, loading };
}