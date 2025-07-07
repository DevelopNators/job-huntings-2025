import ReactQuill from "react-quill";
import React from "react";
import { ErrorMessage } from "formik";
import "react-quill/dist/quill.snow.css"; // make sure styles are included

export const RichContentControl = ({
  label,
  name,
  value,
  setFieldValue,
  isRead = false, // new prop
}) => (
  <div className="mb-6 text-start">
    {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}

    {isRead ? (
      <div
        className="prose max-w-none bg-white text-black  rounded-lg "
        dangerouslySetInnerHTML={{ __html: value }}
      />
    ) : (
      <>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(content) => setFieldValue(name, content)}
          className="bg-white text-black rounded-lg min-h-[200px]"
          modules={{
            toolbar: [
              [{ font: [] }, { size: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike", "blockquote", "code"],
              [{ color: [] }, { background: [] }],
              [{ script: "sub" }, { script: "super" }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ align: [] }],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
        />
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </>
    )}
  </div>
);
