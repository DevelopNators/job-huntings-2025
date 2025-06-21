
  
  // const errImg = import.meta.env.VITE_ERR_IMG;
  const errImg = new URL(import.meta.env.VITE_ERR_IMG, import.meta.url).href;

export const ErrorImg = (event) => {
    event.currentTarget.onerror = null ; // Prevents looping
    event.currentTarget.src = errImg;
};


export const ErrorImg2 = ( currentTarget ) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = errImg;
};