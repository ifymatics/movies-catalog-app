import { render, screen } from "@testing-library/react";
import Home from "./src/pages/index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Home component", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
    mock;
  });

  it("should render movie list", async () => {
    mock.onGet("http://localhost:5000/movies").reply(200, {
      data: [
        { id: 1, title: "Movie 1", genre: "Action" },
        { id: 2, title: "Movie 2", genre: "Comedy" },
      ],
      count: 2,
    });

    render(<Home />);

    const movieList = await screen.findByRole("list");

    expect(movieList).toBeDefined();

    const movieItems = await screen.findAllByRole("listitem");

    expect(movieItems).toHaveLength(2);

    expect(movieItems[0]).toBe("Movie 1");
    expect(movieItems[0]).toBe("Genre:Action");

    expect(movieItems[1]).toBe("Movie 2");
    expect(movieItems[1]).toBe("Genre:Comedy");
  });
});
