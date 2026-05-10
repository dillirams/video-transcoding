import { useEffect, useState } from "react";
import axios from "axios";
import { UserNavbar } from "../component/userNavbar";
import { StudentCourseCard } from "../component/studentCourseCard";
import { BookOpen } from "lucide-react";
import { Footer } from "../component/footer";
import { useNavigate } from "react-router-dom";

export function MyCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  async function fetchMyCourses() {
    try {
      const res = await axios.get("http://localhost:3000/v1/api/getUserCourse", {
        withCredentials: true,
      });
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch my courses", error);
    } finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate();

  function handleStartLearning(courseId: string) {
    navigate(`/learn/${courseId}`);
  }

  return (
    <div className="min-h-screen bg-[#f6f1e9] flex flex-col">
      <UserNavbar userName="Student" />


      {/* Hero Section */}
      <div className="bg-[#2c3e50] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="bg-[#1a252f] p-6 rounded-3xl">
            <BookOpen className="w-16 h-16 text-[#e6b89c]" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              My <span className="italic text-[#e6b89c]">Learning</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Welcome back to your dashboard. Pick up right where you left off and continue mastering new skills.
            </p>
          </div>
        </div>
      </div>

      {/* Course List Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif text-[#2c3e50]">Purchased Courses</h2>
            <p className="text-gray-500 mt-2">Your personal library</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map((skeleton) => (
              <div key={skeleton} className="bg-white rounded-[2rem] h-[450px] animate-pulse p-4 flex flex-col">
                <div className="bg-gray-200 h-56 rounded-xl w-full mb-4"></div>
                <div className="bg-gray-200 h-6 w-2/3 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                <div className="bg-gray-200 h-12 w-full rounded-xl mt-auto"></div>
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <StudentCourseCard
                key={course.id}
                course={course}
                isPurchased={true}
                onAction={handleStartLearning}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No courses purchased yet.</h3>
            <p className="text-gray-500 mt-2 mb-6">Head over to the courses page to find something to learn.</p>
            <a href="/courses" className="inline-block bg-[#2c3e50] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1a252f] transition-colors">
              Browse Courses
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

