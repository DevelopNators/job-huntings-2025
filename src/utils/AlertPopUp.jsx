import React from "react";
import Swal from "sweetalert2";

const AlertPopUp = (
  statusCode,
  message,
  mode = "development",
  context = ""
) => {
  if (statusCode === 200) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      footer: mode === "development" ? `Context: ${context}` : "",
      customClass: {
        popup:
          "bg-white text-gray-900 shadow-lg rounded-lg border-2 border-teal-600", // Background and border
        title: "text-teal-600 font-bold text-xl", // Title color and font size
        content: "text-gray-700 text-sm", // Content color and font size
        confirmButton:
          "bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500", // Button styling
        footer: "text-sm text-gray-500", // Footer text color
      },
      buttonsStyling: false, // Disable default button styling
    });
  }else if(statusCode===0){
    Swal.fire({
      icon: "info",
      title: "Info",
      text: message,
      footer: mode === "development" ? `Context: ${context}` : "",
      customClass: {
        popup:
          "bg-white text-gray-900 shadow-lg rounded-lg border-2 border-red-600", // Red border for error popups
        title: "text-red-600 font-bold text-xl",
        content: "text-gray-700 text-sm",
        confirmButton:
          "bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500",
        footer: "text-sm text-gray-500",
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      buttonsStyling: false,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      footer: mode === "development" ? `Context: ${context}` : "",
      customClass: {
        popup:
          "bg-white text-gray-900 shadow-lg rounded-lg border-2 border-red-600", // Red border for error popups
        title: "text-red-600 font-bold text-xl",
        content: "text-gray-700 text-sm",
        confirmButton:
          "bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500",
        footer: "text-sm text-gray-500",
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      buttonsStyling: false,
    });
  }
};

export default AlertPopUp;
