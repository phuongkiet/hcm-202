import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRegWindowMinimize, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { FaMessage } from "react-icons/fa6";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    try {
      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
      console.log(API_KEY)
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }],
        }
      );
      console.log(response);
      const botMessageText = response.data?.candidates?.[0]?.content?.parts?.[0]
        ?.text
        ? response.data.candidates[0].content.parts[0].text
        : "Sorry, I don't understand";

      const botMessage = { text: botMessageText, sender: "gemini" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error: ", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error generating response", sender: "gemini" },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const clearMessagesOnExit = () => {
    setMessages([]);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearMessagesOnExit);
    return () => {
      window.removeEventListener("beforeunload", clearMessagesOnExit);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 md:bottom-5 md:right-5">
      {isOpen ? (
        <div className="flex flex-col w-full max-w-xs md:max-w-sm lg:max-w-md h-96 bg-white shadow-lg border rounded-lg">
          <div className="flex items-center justify-between p-3 bg-blue-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <img
                src="/geminiicon.jpg"
                alt="Gemini Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-bold">ChatBot</span>
            </div>
            <button onClick={toggleChat}>
              <FaRegWindowMinimize />
            </button>
          </div>
          <div className="flex-grow p-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.sender === "gemini" ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-gray-100 flex items-center">
            <input
              type="text"
              className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-r-lg"
              onClick={sendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg text-2xl sm:text-md"
          onClick={toggleChat}
        >
          <FaMessage />
        </button>
      )}
    </div>
  );
};

export default ChatBox;
