import axios from "axios";

export interface ImageData {
  id: number;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface ImageResponse {
  total: number;
  total_pages: number;
  results: ImageData[];
}

axios.defaults.baseURL = "https://api.unsplash.com/";
export const getImages = async (
  topic: string,
  currentPage: number
): Promise<ImageResponse> => {
  const response = await axios.get(
    "/search/photos?client_id=E5ABb0U9uZIG-WiJXhb3ZD8kkLohYHcuGEKhpPQZUBg",
    {
      params: {
        query: topic,
        page: currentPage,
        per_page: 12,
      },
    }
  );

  return response.data;
};
