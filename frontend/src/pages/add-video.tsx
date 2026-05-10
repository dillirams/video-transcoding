import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../component/input";
import { Button } from "../component/button";
import { X, Video } from "lucide-react";
import axios from "axios";

export function AddVideo() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  async function submitVideo() {
    try {
      setLoading(true);

      const title = titleRef.current?.value;
      const video = videoRef.current?.files?.[0];

      if (!title || !video) {
        alert("Please provide both title and video file");
        return;
      }

      // Get presigned URL and create lecture
      const res = await axios.post(
        "http://localhost:3000/v1/api/addLecture",
        {
          courseId,
          title,
          fileType: video.type,
        },
        {
          withCredentials: true,
        }
      );

      const uploadUrl = res.data.uploadUrl;

      // Upload directly to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": video.type,
        },
        body: video,
      });

      alert("Video lecture uploaded successfully");
      navigate("/tutorDashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to upload video");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f1e9] flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-sm p-8 relative">
        <button
          onClick={() => navigate("/tutorDashboard")}
          className="absolute top-6 right-6 text-gray-500 hover:text-black"
        >
          <X size={28} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#f6f1e9] flex justify-center items-center mx-auto mb-4">
            <Video className="text-[#d97757]" size={30} />
          </div>
          <h2 className="text-4xl font-serif text-[#234b33]">Add Lecture Video</h2>
          <p className="text-gray-500 mt-3">Upload a new video for your course.</p>
        </div>

        <div className="space-y-5">
          <Input ref={titleRef} placeholder="Lecture Title" type="text" />
          <Input ref={videoRef} type="file" placeholder="Video File" accept="video/*" />

          <Button
            onClick={submitVideo}
            size="lg"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Upload Lecture
          </Button>
        </div>
      </div>
    </div>
  );
}
