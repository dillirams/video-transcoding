import axios from "axios";
import { SendHorizonal, X, Bot, User } from "lucide-react";
import { useRef, useState } from "react";
import { useCourseState } from "../store/create";

interface Message {
  role: "user" | "ai";
  text: string;
}

export function ChatWithAi() {
  const [chats, setChats] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef<HTMLInputElement>(null);

  const { setChatAi } = useCourseState();

  async function sendChat() {
    const text = chatRef.current?.value?.trim();

    if (!text) return;

    // Add user message first
    setChats((prev) => [...prev, { role: "user", text }]);

    if (chatRef.current) {
      chatRef.current.value = "";
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: text,
      });

      setChats((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.response,
        },
      ]);
    } catch (error) {
      setChats((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[380px] max-w-[95vw] h-[550px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6" />
          <div>
            <h2 className="font-semibold text-lg">Brothers Bhutan AI</h2>
            <p className="text-xs opacity-80">Ask anything</p>
          </div>
        </div>

        <button
          onClick={() => setChatAi(false)}
          className="hover:bg-white/20 p-2 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chats.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            Start a conversation with AI ✨
          </div>
        )}

        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                chat.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 border rounded-bl-sm"
              }`}
            >
              <div className="flex items-start gap-2">
                {chat.role === "ai" && (
                  <Bot className="w-4 h-4 mt-1 text-indigo-500" />
                )}
                {chat.role === "user" && (
                  <User className="w-4 h-4 mt-1 text-white" />
                )}
                <p className="text-sm leading-relaxed">{chat.text}</p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">AI is thinking...</div>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-white p-3">
        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 py-2">
          <input
            ref={chatRef}
            type="text"
            placeholder="Ask AI anything..."
            className="flex-1 bg-transparent outline-none text-sm px-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendChat();
            }}
          />

          <button
            onClick={sendChat}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
          >
            <SendHorizonal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}