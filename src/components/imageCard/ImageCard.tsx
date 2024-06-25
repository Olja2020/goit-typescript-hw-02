import css from "./ImageCard.module.css";
import React, { FC } from "react";

interface ImageCardProps {
  data: {
    alt_description: string;
    urls: { small: string };
  };
}

const ImageCard: FC<ImageCardProps> = ({
  data: {
    alt_description,
    urls: { small },
  },
}) => {
  return (
    <div className={css.container}>
      <img src={small} alt={alt_description} />
    </div>
  );
};
export default ImageCard;
