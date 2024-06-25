import ImageCard from "../imageCard/ImageCard";
import css from "./ImageGallery.module.css";
import React, { FC } from "react";
//import {ImageData} from "../App"
//import { RootState } from "./redux/store";
interface ImageData {
  id: number;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface ImageListProps {
  items: ImageData[];
  openModal: (image: ImageData) => void;
}

const ImageGallery: FC<ImageListProps> = ({ items, openModal }) => {
  return (
    <ul className={css.list}>
      {items.map((item: ImageData) => (
        <li className={css.item} key={item.id} onClick={() => openModal(item)}>
          <ImageCard data={item} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
