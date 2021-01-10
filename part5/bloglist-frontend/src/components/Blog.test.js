import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("hides extended info", () => {
  const blog = {
    title: "Some title",
    author: "The Author",
    user: {
      id: "123",
    },
    likes: 3,
    url: "/some/url",
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("Some title");
  expect(component.container).not.toHaveTextContent("/some/url");
  expect(component.container).not.toHaveTextContent("3 likes");
});
