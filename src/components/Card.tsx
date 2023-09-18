import React from "react";
import { Link } from "react-router-dom";

type IData = {
  id: string;
  volumeInfo: {
    imageLinks: {
      smallThumbnail: string;
    };
    title: string;
    publisher: string;
    publishedDate: string;
    language: string;
  };
};
const Card = (book: IData) => {
  return (
    <div className="rounded border border-[#e8e8e8] bg-white p-[5px]">
      <Link className="flex" to={`/book/${book.id}`} {...book}>
        <img
          src={
            book.volumeInfo?.imageLinks?.smallThumbnail ||
            "/images/cover_not_found.jpg"
          }
          className="h-[150px]"
          alt="cover"
        />
        <div className="ml-3">
          <h1 className="text-l text-[#1a0dab]">{book?.volumeInfo?.title}</h1>
          <div className="">
            <span className="text-sm text-[#1a0dab]">Publisher:</span>
            <span className="ml-1 text-sm text-[#4d5156]">
              {book.volumeInfo.publisher}
            </span>
          </div>
          <div className="">
            <span className="text-sm text-[#1a0dab]">Publish Date:</span>
            <span className="ml-1 text-sm text-[#4d5156]">
              {book.volumeInfo.publishedDate}
            </span>
          </div>
          <div className="">
            <span className="text-sm text-[#1a0dab]">Language:</span>
            <span className="ml-1 text-sm text-[#4d5156]">
              {book.volumeInfo.language}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
