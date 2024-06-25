import { useEffect, useState } from "react";
import LoadMoreBtn from "./loadMoreBtn/LoadMoreBtn";
import Loader from "./loader/Loader";
import ImageGallery from "./imageGallery/ImageGallery";
import SearchBar from "./searchBar/SearchBar";
import ErrorMessage from "./errorMassage/ErrorMessage";
import ImageModal from "./imageModal/ImageModal";
import React from "react";
import { getImages } from "../Api";
import { ImageResponse } from "../Api";
import { ImageData } from "../Api";

export interface ImageProps {
  openModal: (image: ImageData) => void;
}

export interface SearchBarProps {
  images: ImageData[];
  onSearch: (topic: string) => void;
}

export interface LoadMoreBtnProps {
  onClick: () => void;
}

export interface ImageModalProps {
  closeModal: () => void;
  data: ImageData;
}
export default function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImages(searchQuery, page);
        setImages((prevState) => [...prevState, ...data.results]);
        setShowBtn(data.total_pages && data.total_pages !== page);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, searchQuery]);

  const handleSearch = async (topic: string) => {
    setSearchQuery(topic);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  function openModal(image: ImageData) {
    setIsOpen(true);
    setSelectedImage(image);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <SearchBar images={images} onSearch={handleSearch} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {showBtn && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {isError && <ErrorMessage />}
      {modalIsOpen && (
        <ImageModal closeModal={closeModal} data={selectedImage} />
      )}
    </div>
  );
}
