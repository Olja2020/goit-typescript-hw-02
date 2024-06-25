import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import React, { FC } from "react";
import { ImageData } from "../../Api";

const notify = () => toast("Необхідно ввести текст для пошуку зображень");

interface SearchBarProps {
  images: ImageData[];
  onSearch: (topic: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, images }) => {
  return (
    <Formik
      initialValues={{ guery: "" }}
      onSubmit={(values, actions) => {
        if (!values.guery) {
          notify();
          return;
        }
        onSearch(values.guery);
        actions.resetForm();
      }}
    >
      <Form className={css.inputForm}>
        <Field
          className={css.fieldForm}
          type="text"
          name="guery"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
        <button className={css.buttonBar} type="submit">
          Search
        </button>
        {images.length === 0 && <Toaster />}
      </Form>
    </Formik>
  );
};
export default SearchBar;
