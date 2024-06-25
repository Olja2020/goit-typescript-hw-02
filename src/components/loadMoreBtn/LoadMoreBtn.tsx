import css from "./LoadMoreBtn.module.css";
import React, { FC } from "react";

interface LoadMoreBtnProps {
  onClick: () => void;
}
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.btn}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
