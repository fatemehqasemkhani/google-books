import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookDetails } from "../api/api";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import removeHtmlTags from "../utils";

type IData = {
  id: string;
  volumeInfo: {
    imageLinks: {
      large: string;
    };
    title: string;
    subtitle: string;
    publisher: string;
    description: string;
    language: string;
  };
};

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<IData | null>(null);
  const navigate = useNavigate();
  const { volumeInfo } = bookDetails || {};

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getBookDetails(id);
        setBookDetails(response);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <section className="max-w-[100%] p-[15px]">
      <button
        type="button"
        className="mb-[10px] flex h-[40px] w-[100px] items-center justify-center text-sm text-[#000]"
        onClick={() => navigate("/")}
      >
        <BiArrowBack size={18} />
        <span className="ml-[10px]">Go Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 p-[15px]">
        <img
          className="rounded mb-3"
          src={volumeInfo?.imageLinks?.large}
          alt="cover img"
        />
        <div className="ml-0 md:ml-5">
          <span className="text-2xl text-[#1a0dab]">{volumeInfo?.title}</span>
          {volumeInfo?.subtitle && (
            <span className="text-sm text-[#4d5156]">
              {bookDetails?.volumeInfo?.subtitle || "--"}
            </span>
          )}
          <div className="mb-2">
            <span className="text-sm text-[#1a0dab]">Publisher: </span>
            <span className="ml-1 text-sm text-[#4d5156]">
              {volumeInfo?.publisher || "--"}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-[#1a0dab]">Language: </span>
            <span className="ml-1 text-sm text-[#4d5156]">
              {volumeInfo?.language || "--"}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-[#1a0dab]">Summery: </span>
            <span className="ml-1 block text-justify text-sm text-[#4d5156]">
              {(volumeInfo?.description &&
                removeHtmlTags(volumeInfo?.description)) ||
                "--"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
