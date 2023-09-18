import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1";

export const searchBooks = async (
  query: string,
  maxResults: number,
  startIndex: number,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes`, {
      params: {
        q: query,
        maxResults,
        startIndex,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookDetails = async (bookId: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes/${bookId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
