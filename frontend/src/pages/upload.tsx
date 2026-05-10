
import { Input } from "../component/input";
import { X, UploadCloud } from "lucide-react";
import { useCourseState } from "../store/create";
import { Button } from "../component/button";
import { useRef, useState } from "react";
import axios from "axios";

export function Upload() {
  const { upload, setUpload } = useCourseState();

  const courseNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  async function submitDetail() {
    try {
      setLoading(true);

      const courseName = courseNameRef.current?.value;
      const description = descriptionRef.current?.value;
      const price = priceRef.current?.value;
      const image = imageRef.current?.files?.[0];

      if (!image) {
        alert("Please upload an image");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/v1/api/createCourse",
        {
          name: courseName,
          description,
          price,
          fileType: image.type,
        },
        {
          withCredentials: true,
        }
      );

      const uploadUrl = res.data.uploadUrl;

      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": image.type,
        },
        body: image,
      });

      alert("Course uploaded successfully");
      setUpload(false);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl p-8 relative animate-fadeIn">
        {/* Close */}
        <button
          onClick={() => setUpload(!upload)}
          className="absolute top-6 right-6 text-gray-500 hover:text-black"
        >
          <X size={28} />
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#f6f1e9] flex justify-center items-center mx-auto mb-4">
            <UploadCloud className="text-[#d97757]" size={30} />
          </div>

          <h2 className="text-4xl font-serif text-[#234b33]">
            Upload New Course
          </h2>

          <p className="text-gray-500 mt-3">
            Share your knowledge with learners.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <Input
            ref={courseNameRef}
            placeholder="Course Name"
            type="text"
          />

          <Input
            ref={descriptionRef}
            placeholder="Course Description"
            type="text"
          />

          <Input
            ref={priceRef}
            placeholder="Course Price"
            type="number"
          />

          <Input
            ref={imageRef}
            type="file"
            placeholder="Course Thumbnail"
          />

          <Button
            onClick={submitDetail}
            size="lg"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Publish Course
          </Button>
        </div>
      </div>
    </div>
  );
}