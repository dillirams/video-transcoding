import { Plus, Clock3, IndianRupee, ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { Button } from "../component/button";
import { useState } from "react";

interface CourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    createdAt: string;
    lectures?: Array<{
      id: string;
      title: string;
      videoUrl: string;
      position: number;
    }>;
  };
  onAddVideo: (courseId: string) => void;
  onPreview: (courseId: string) => void;
}

export function CourseCard({
  course,
  onAddVideo,
  onPreview,
}: CourseCardProps) {
  const [showLectures, setShowLectures] = useState(false);

  const formattedDate = new Date(course.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all overflow-hidden border border-[#ebe3d7] flex flex-col h-full w-full">
      {/* Course Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <img
          src={course.imageUrl}
          alt={course.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 right-4 bg-[#234b33] text-white px-4 py-2 rounded-full flex items-center gap-1 text-sm font-medium shadow">
          <IndianRupee size={16} />
          {course.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-serif text-[#234b33] line-clamp-1">
            {course.name}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock3 size={12} />
            {formattedDate}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-3 text-sm leading-relaxed line-clamp-2">
          {course.description}
        </p>

        <div className="mt-4 flex-grow">
          {/* Lectures Count & Toggle */}
          <div className="flex items-center justify-between border-t border-[#ebe3d7] pt-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-tight">
              {course.lectures?.length || 0} Lectures
            </span>
            {course.lectures && course.lectures.length > 0 && (
              <button
                onClick={() => setShowLectures(!showLectures)}
                className="text-[#d97757] hover:text-[#c45a3d] text-xs font-bold flex items-center gap-1 transition-colors"
              >
                {showLectures ? "Hide" : "View"}
                {showLectures ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>

          {/* Lectures List */}
          {showLectures && course.lectures && (
            <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {course.lectures.map((lecture, index) => (
                <div key={lecture.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#f6f1e9] text-[#234b33] border border-[#ebe3d7] group">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <PlayCircle size={14} className="text-[#d97757]" />
                    <span className="text-xs font-medium truncate">{lecture.title}</span>
                  </div>
                  <button 
                    onClick={() => onPreview(course.id)}
                    className="text-[10px] font-bold text-[#d97757] hover:underline uppercase"
                  >
                    Play
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6">
          <Button
            size="sm"
            variant="primary"
            fullWidth
            onClick={() => onAddVideo(course.id)}
          >
            <div className="flex items-center justify-center gap-1.5">
              <Plus size={16} />
              Add Lecture
            </div>
          </Button>
        </div>
      </div>

    </div>
  );
}