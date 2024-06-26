import ImageCard from "../imageCard/ImageCard";
import css from "./ImageGallery.module.css";
import React, { FC } from "react";
import {ImageData} from "../../Api"



interface ImageGalleryProps {
  images: ImageData[];
  openModal: (image: ImageData) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images.map((item: ImageData) => (
        <li className={css.item} key={item.id} onClick={() => openModal(item)}>
          <ImageCard data={item} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
