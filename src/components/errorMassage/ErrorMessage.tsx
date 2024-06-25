import css from "./ErrorMessage.module.css";
import React, { FC } from "react";

const ErrorMessage: React.FC = () => {
  return <div className={css.container}>Помилка, перезавантажте сторінку!</div>;
};
export default ErrorMessage;
