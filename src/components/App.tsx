import { useEffect, useState } from "react";
import LoadMoreBtn from "./loadMoreBtn/LoadMoreBtn";
import Loader from "./loader/Loader";
import ImageGallery from "./imageGallery/ImageGallery";
import SearchBar from "./searchBar/SearchBar";
import ErrorMessage from "./errorMassage/ErrorMessage";
import ImageModal from "./imageModal/ImageModal";
import React from "react";
import { getImages } from "../Api";

interface ImageData {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface ImageProps {
  openModal: (image: ImageData) => void;
}

interface SearchBarProps {
  images: ImageData[];
  onSearch: (topic: string) => void;
}

interface LoadMoreBtnProps {
  onClick: () => void;
}

interface ImageModalProps {
  image: ImageData | null;
  closeModal: () => void;
  data: ImageData | null;
}
export default function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
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

  function openModal(image: ImageDataRegular) {
    setIsOpen(true);
    setSelectedImage(image);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <SearchBar images={images} onSearch={handleSearch} />
      <ImageGallery items={images} openModal={openModal} />
      {isLoading && <Loader />}
      {showBtn && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {isError && <ErrorMessage />}
      {modalIsOpen && (
        <ImageModal
          // image={selectedImage}
          closeModal={closeModal}
          data={selectedImage}
        />
      )}
    </div>
  );
}