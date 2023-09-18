import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import Catalogue from "../page/Catalogue";
import * as api from "../api/api";

jest.mock("axios");
afterEach(cleanup);

test("searching for books displays results", async () => {
  const mockSearchBooks = jest.spyOn(api, "searchBooks");
  mockSearchBooks.mockResolvedValue([
    { id: "1", volumeInfo: { title: "Book 1" } },
    { id: "2", volumeInfo: { title: "Book 2" } },
  ]);

  render(<Catalogue />);

  const searchInput = screen.getByTestId("search-field");
  const searchButton = screen.getByTestId("search-button");

  fireEvent.change(searchInput, { target: { value: "turkey" } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(mockSearchBooks).toHaveBeenCalledWith("turkey", 20, 1);
  });
});
