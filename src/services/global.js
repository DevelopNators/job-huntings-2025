import noimgfound from "../template/images/error-images/No-image-found.jpg";

export const ErrorImg = ({ currentTarget }) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = noimgfound;
};
