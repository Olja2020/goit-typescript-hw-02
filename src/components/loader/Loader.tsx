import { Audio } from "react-loader-spinner";
import css from "./Loader.module.css";
import React, { FC } from "react";

interface LoaderProps {
  size: number; // Розмір індикатора завантаження
  color: string;
  radius: number; // Колір індикатора
}
const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className={css.loader}>
      <Audio
        height="80"
        width="80"
        // radius="9"
        color="#3846ad"
        ariaLabel="three-dots-loading"
        // wrapperStyle // Залежить від структури wrapperStyle
        // wrapperClass // Залежить від структури wrapperClass
      />
    </div>
  );
};

export default Loader;

// export default function Loader() {
//   return (
//     <div className={css.loader}>
//       <Audio
//         height="80"
//         width="80"
//         radius="9"
//         color="#3846ad"
//         ariaLabel="three-dots-loading"
//         wrapperStyle
//         wrapperClass
//       />
//     </div>
//   );
// }
