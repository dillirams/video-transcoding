import { ShoppingCart, Clock3, IndianRupee, PlayCircle } from "lucide-react";
import { Button } from "./button";

interface StudentCourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    createdAt: string;
    admin?: {
      name: string;
    };
  };
  isPurchased?: boolean;
  onAction: (courseId: string, price:number) => void;
  loading?: boolean;
}

export function StudentCourseCard({
  course,
  isPurchased = false,
  onAction,
  loading = false,
}: StudentCourseCardProps) {
  const formattedDate = new Date(course.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="bg-white rounded-[2rem] shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100 flex flex-col group">
      {/* Course Thumbnail */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Price tag (hide if purchased) */}
        {!isPurchased && (
          <div className="absolute top-4 right-4 bg-[#2c3e50] text-white px-4 py-2 rounded-full flex items-center gap-1 text-sm font-bold shadow-lg backdrop-blur-md bg-opacity-90">
            <IndianRupee size={16} />
            {course.price}
          </div>
        )}
        
        {isPurchased && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-1 text-xs font-bold shadow-lg uppercase tracking-wider">
            Owned
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <p className="text-xs uppercase tracking-widest text-[#d97757] font-semibold mb-1">
            {course.admin?.name || "Premium Course"}
          </p>
          <h2 className="text-2xl font-serif text-[#2c3e50] line-clamp-2">
            {course.name}
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-500 mt-2 leading-relaxed text-sm line-clamp-3 flex-grow">
          {course.description || "No description provided for this course."}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 font-medium">
          <Clock3 size={14} />
          Added {formattedDate}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-5"></div>

        {/* Action Button */}
        <Button
          size="lg"
          variant="primary"
          fullWidth
          loading={loading}
          onClick={() => onAction(course.id, course.price)}
          className={isPurchased ? "bg-[#234b33] hover:bg-[#1a3826]" : "bg-[#2c3e50] hover:bg-[#1a252f]"}
        >
          <div className="flex items-center justify-center gap-2">
            {isPurchased ? (
              <>
                <PlayCircle size={20} />
                Start Learning
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Buy Course
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
}
