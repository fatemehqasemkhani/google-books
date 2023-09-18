import React, { useState } from "react";
import { searchBooks } from "../api/api";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../components/Card";
import logo from "../images/googlelogo.png";

const Catalogue: React.FC = () => {
  const [query, setQuery] = useState("");
  const [marginTop, setMarginTop] = useState(200);
  const [books, setBooks] = useState<any[]>([]);

  const handleSearch = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await searchBooks(query, 20, 1);
        setMarginTop(10);
        setBooks(response?.items || []);
      } catch (error) {
        console.error("Error searching for books:", error);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div
        style={{ marginTop: `${marginTop}px` }}
        className="m-auto flex h-[150px] w-[50%] flex-col items-center px-[15px] transition-[margin] duration-500 ease-in"
      >
        <img src={logo} className="mt-[30px] h-[40px]" alt="logo" />
        <form onSubmit={handleSearch} className="m-auto w-[90%]">
          <div className="relative">
            <input
              data-testid="search-field"
              placeholder="Search for books"
              value={query}
              type="text"
              className="h-[60px] w-[100%] rounded-full border-0 pl-[20px] text-[#000] shadow-[0_2px_5px_1px_rgba(64,60,67,.16)] focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              data-testid="search-button"
              type="submit"
              className="absolute right-[0] h-[60px] w-[40px]"
              onClick={handleSearch}
            >
              <AiOutlineSearch className="m-[0] text-[#4285f4]" size={24} />
            </button>
          </div>
        </form>
      </div>
      <section className="grid grid-cols-1 gap-2 px-[15px] md:grid-cols-2">
        {books.map((item, index) => (
          <Card key={item.id} {...item} />
        ))}
      </section>
    </>
  );
};

export default Catalogue;
