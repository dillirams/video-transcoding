import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlayCircle, ArrowLeft, Loader2 } from "lucide-react";
import { UserNavbar } from "../component/userNavbar";
import VideoPlayer from "../component/videoPlayer";

export function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState<any>(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  async function fetchCourseDetails() {
    try {
      // 1. Try fetching as a student (purchased courses)
      const userRes = await axios.get("http://localhost:3000/v1/api/getUserCourse", {
        withCredentials: true,
      });
      const userCourses = userRes.data.courses || [];
      let currentCourse = userCourses.find((c: any) => c.id === courseId);
      
      // 2. If not found, try fetching as a tutor (owned courses)
      if (!currentCourse) {
        const adminRes = await axios.get("http://localhost:3000/v1/api/getCourse", {
          withCredentials: true,
        });
        const adminCourses = adminRes.data.course || []; // Backend returns 'course' field
        currentCourse = adminCourses.find((c: any) => c.id === courseId);
      }

      if (currentCourse) {
        setCourse(currentCourse);
        if (currentCourse.lectures && currentCourse.lectures.length > 0) {
          setSelectedLecture(currentCourse.lectures[0]);
        }
      } else {
        alert("Course not found or unauthorized");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to fetch course details", error);
      // Fallback: try the other endpoint directly if one failed (e.g. 401/403)
      try {
        const adminRes = await axios.get("http://localhost:3000/v1/api/getCourse", {
          withCredentials: true,
        });
        const adminCourses = adminRes.data.course || [];
        const currentCourse = adminCourses.find((c: any) => c.id === courseId);
        if (currentCourse) {
          setCourse(currentCourse);
          if (currentCourse.lectures && currentCourse.lectures.length > 0) {
            setSelectedLecture(currentCourse.lectures[0]);
          }
          return;
        }
      } catch (e) {
        console.error("Admin fetch also failed", e);
      }
      alert("Failed to load course content");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f1e9] flex flex-col justify-center items-center">
        <Loader2 className="w-12 h-12 text-[#2c3e50] animate-spin mb-4" />
        <p className="text-xl font-serif text-[#2c3e50]">Loading Course...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1e9] flex flex-col">
      <UserNavbar userName="Student" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Video Player Section */}
        <div className="flex-1 bg-black flex flex-col">
          <div className="p-4 flex items-center bg-[#1a252f] text-white">
            <button onClick={() => navigate("/my-courses")} className="hover:text-[#e6b89c] transition-colors mr-4">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-serif">{course?.name} - {selectedLecture?.title || "No Lecture Selected"}</h1>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative">
            {selectedLecture ? (
              selectedLecture.masterPlayListUrl ? (
                <VideoPlayer
                  key={selectedLecture.id}
                  src={selectedLecture.masterPlayListUrl}
                  className="w-full h-full max-h-[80vh] object-contain"
                />
              ) : selectedLecture.orginalVideoUrl ? (
                <video
                  key={selectedLecture.id}
                  controls
                  className="w-full h-full max-h-[80vh] object-contain"
                >
                  <source src={selectedLecture.orginalVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-white text-center">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                  <p className="text-xl font-medium text-gray-400">Processing video...</p>
                </div>
              )
            ) : (
              <div className="text-white text-center">
                <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-xl font-medium text-gray-400">No video available</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Lectures List) */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full overflow-y-auto">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-2xl font-serif text-[#2c3e50]">Course Content</h2>
            <p className="text-gray-500 text-sm mt-1">{course?.lectures?.length || 0} Lectures</p>
          </div>

          <div className="flex-1 p-4 space-y-2">
            {course?.lectures?.length > 0 ? (
              course.lectures.map((lecture: any, index: number) => (
                <button
                  key={lecture.id}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`w-full text-left p-4 rounded-xl flex items-start gap-4 transition-colors ${
                    selectedLecture?.id === lecture.id
                      ? "bg-[#2c3e50] text-white"
                      : "hover:bg-gray-50 text-[#2c3e50]"
                  }`}
                >
                  <div className={`mt-1 flex-shrink-0 ${selectedLecture?.id === lecture.id ? "text-[#e6b89c]" : "text-gray-400"}`}>
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase opacity-70 mb-1 block">
                      Lecture {index + 1}
                    </span>
                    <p className={`font-medium ${selectedLecture?.id === lecture.id ? "text-white" : "text-gray-800"}`}>
                      {lecture.title}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No lectures available for this course yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
