import { useEffect, useState } from "react";
import axios from "axios";

export function useGetCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get(
          "http://localhost:3000/v1/api/getCourse",
          {
            withCredentials: true,
          }
        );

        setCourses(res.data.course);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, loading };
}