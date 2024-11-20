"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["extra-small", "small", "medium", "large"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  },
};

export default function Description({ data, handleData }) {
  const handleChange = (value) => {
    handleData("description", value);
  };
  return (
    <section className="flex flex-col h-full gap-3 p-4 bg-white border rounded-xl">
      <h1 className="font-semibold">Description</h1>
      <ReactQuill
        value={data?.description}
        onChange={handleChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
    </section>
  );
}