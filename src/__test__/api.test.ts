import axios from "axios";
import { searchBooks, getBookDetails } from "../api/api";

const BASE_URL = "https://www.googleapis.com/books/v1";

jest.mock("axios");

describe("API Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all Axios mocks after each test
  });

  it("searchBooks should return data for a valid query", async () => {
    const mockData = {
      items: [
        { id: "1", volumeInfo: { title: "book 1" } },
        { id: "2", volumeInfo: { title: "book 2" } },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const query = "dubai";
    const maxResults = 10;
    const startIndex = 1;

    const result = await searchBooks(query, maxResults, startIndex);

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/volumes`, {
      params: { q: query, maxResults, startIndex },
    });
  });

  it("searchBooks should throw an error for invalid query", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const query = "invalid_query";
    const maxResults = 10;
    const startIndex = 1;

    await expect(searchBooks(query, maxResults, startIndex)).rejects.toThrow(
      errorMessage,
    );
  });

  it("getBookDetails should return data for a valid bookId", async () => {
    const mockData = { title: "Book Title" };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const bookId = "QltiDwAAQBAJ";

    const result = await getBookDetails(bookId);

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/volumes/${bookId}`);
  });

  it("getBookDetails should throw an error for invalid bookId", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const bookId = "invalid_book_id";

    await expect(getBookDetails(bookId)).rejects.toThrow(errorMessage);
  });
});
