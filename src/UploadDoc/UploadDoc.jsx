import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import { FaUpload } from "react-icons/fa6";
import { toast } from "sonner";

const UploadDoc = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setLoading(true);
    for (const file of files) {
      if (file.size <= 10 * 1024 * 1024) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
          });

          const result = await response.json();

          if (response.ok) {
            toast(`File "${result.filename}" uploaded and processed! Content length: ${result.content_length} characters`);
          } else {
            toast(`Error: ${result.message}`);
          }
        } catch (error) {
          console.error('Upload error:', error);
          toast('Failed to upload file. Please check if the server is running.');
        }
      } else {
        toast(`File "${file.name}" too large or invalid type.`);
      }
    }
    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  return (
    <div className="h-full w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Document Summarizer</h1>
        <p className="text-center text-gray-600 mb-8">
            Extract key information and insights from your documents.
        </p>

        <div
            className="bg-orange-100 border-2 border-dashed border-gray-300 p-12 mt-8 text-center rounded-xl cursor-pointer hover:bg-orange-50 transition-colors"
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {loading ? (
                <div className="flex flex-col items-center">
                    <AiOutlineLoading className="animate-spin w-10 h-10 mb-3 text-orange-500"/>
                    <p className="text-gray-700">Processing your file...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <motion.div
                        animate={isHovered ? { y: [-5, 0, -5] } : { y: 0 }}
                        transition={{
                            duration: 1.0,
                            repeat: isHovered ? Infinity : 0,
                            ease: "easeInOut"
                        }}
                    >
                        <FaUpload className="w-10 h-10 mb-3"/>
                    </motion.div>
                    <p className="text-gray-700">Drag a file here or click to upload</p>
                </div>
            )}
            <small className="block mt-3 text-gray-500 text-sm">
                Accepted: PDF, Word, Markdown, Text | Max: 10MB
            </small>
      <input
        type="file"
        accept=".pdf,.docx,.md,.txt"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        multiple
      />
        </div>
    </div>
  );
};

export default UploadDoc;
