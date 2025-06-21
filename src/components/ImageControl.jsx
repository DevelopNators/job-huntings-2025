const errImg = new URL(
  import.meta.env.VITE_DEFAULT_ERROR_IMAGE,
  import.meta.url
).href;

export const ErrorImg2 = (currentTarget) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = errImg;
};
export const ErrorImg = (event) => {
  event.currentTarget.onerror = null; // Prevents looping
  event.currentTarget.src = errImg;
};
const ImageControl = ({
  className = "w-full h-full object-cover",
  alt = "",
  src = "",
}) => {
  return <img src={src} alt={alt} className={className} onError={ErrorImg}  />;
};

export default ImageControl;
