import { useEffect, useState } from "react";
import axios from "axios";
import { UserNavbar } from "../component/userNavbar";
import { StudentCourseCard } from "../component/studentCourseCard";
import { Compass, Search } from "lucide-react";
import { Footer } from "../component/footer";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await axios.get("http://localhost:3000/v1/api/getAllCourses", {
        withCredentials: true,
      });
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuyCourse(courseId: string) {
    try {
      setBuyingId(courseId);
      const res = await axios.post(
        `http://localhost:3000/v1/api/buyCourse?courseId=${courseId}`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message || "Course purchased successfully!");
      navigate("/my-courses");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to purchase course");
    } finally {
      setBuyingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f1e9]">
      <UserNavbar userName="Student" />

      {/* Hero Section */}
      <div className="bg-[#2c3e50] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <Compass className="w-16 h-16 text-[#e6b89c] mb-6" />
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Discover Your Next <span className="italic text-[#e6b89c]">Passion</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
            Browse our curated collection of premium courses taught by expert mentors. Transform your skills today.
          </p>
          
          <div className="relative w-full max-w-xl">
            <input 
              type="text" 
              placeholder="Search for courses..." 
              className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#e6b89c] transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
          </div>
        </div>
      </div>

      {/* Course List Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif text-[#2c3e50]">Available Courses</h2>
            <p className="text-gray-500 mt-2">Explore the complete catalog</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-white rounded-[2rem] h-[450px] animate-pulse p-4 flex flex-col">
                <div className="bg-gray-200 h-56 rounded-xl w-full mb-4"></div>
                <div className="bg-gray-200 h-6 w-2/3 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-4/5 rounded mb-auto"></div>
                <div className="bg-gray-200 h-12 w-full rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <StudentCourseCard
                key={course.id}
                course={course}
                onAction={handleBuyCourse}
                loading={buyingId === course.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
            <h3 className="text-xl font-medium text-gray-700">No courses available yet.</h3>
            <p className="text-gray-500 mt-2">Check back later for new content.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

