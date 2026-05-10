
import { Button } from "../component/button";
import { CourseCard } from "../component/courseCard";
import { useGetCourse } from "../hooks/getCourse";
import { useCourseState } from "../store/create";
import { Upload } from "./upload";
import { TutorNavbar } from "../component/tutorNavbar";
import { useGetTutor } from "../hooks/getTutor";
import { Footer } from "../component/footer";
import { useNavigate } from "react-router-dom";

export function TutorDashboard() {
  const { upload, setUpload } = useCourseState();
  const { courses, loading } = useGetCourse();
  const { tutor, loading: tutorLoading } = useGetTutor();
  const navigate = useNavigate();

  function handleAddVideo(courseId: string) {
    navigate(`/add-video/${courseId}`);
  }

  function handlePreview(courseId: string) {
    navigate(`/learn/${courseId}`);
  }

  if (loading || tutorLoading) {
    return (
      <div className="min-h-screen bg-[#f6f1e9] flex justify-center items-center">
        <p className="text-2xl font-serif text-[#234b33]">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1e9] flex flex-col">
      {/* Navbar */}
      <TutorNavbar tutorName={tutor?.name} />


      {/* Upload Modal */}
      {upload && <Upload />}

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Left */}
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#d97757] mb-3">
              Tutor Dashboard
            </p>

            <h1 className="text-5xl md:text-7xl font-serif text-[#234b33] leading-tight">
              Welcome,{" "}
              <span className="italic text-[#d97757]">
                {tutor?.name?.split(" ")[0]}
              </span>
            </h1>

            <p className="text-lg text-gray-600 mt-5 max-w-2xl leading-relaxed">
              Manage your courses, inspire students, and expand your
              educational journey through meaningful teaching.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setUpload(true)}
            >
              Upload New Course
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#ebe3d7] p-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">
              Total Courses
            </p>
            <h2 className="text-4xl font-serif text-[#234b33] mt-2">
              {courses.length}
            </h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">
              Mentor
            </p>
            <h2 className="text-2xl font-medium text-[#234b33] mt-2">
              {tutor?.name}
            </h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">
              Academy
            </p>
            <h2 className="text-2xl font-medium text-[#234b33] mt-2">
              Brothers Bhutan
            </h2>
          </div>
        </div>
      </div>

      {/* Course Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {courses.length === 0 ? (
          <div className="bg-white rounded-[2rem] shadow-sm p-16 text-center">
            <h2 className="text-3xl font-serif text-[#234b33]">
              No Courses Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Begin by creating your first course and inspiring students.
            </p>

            <div className="mt-8">
              <Button
                size="md"
                variant="secondary"
                onClick={() => setUpload(true)}
              >
                Create First Course
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Section Heading */}
            <div className="mb-10">
              <h2 className="text-4xl font-serif text-[#234b33]">
                Your <span className="italic text-[#d97757]">Courses</span>
              </h2>

              <p className="text-gray-600 mt-3">
                Build, manage, and grow your teaching legacy.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course: any) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onAddVideo={handleAddVideo}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}