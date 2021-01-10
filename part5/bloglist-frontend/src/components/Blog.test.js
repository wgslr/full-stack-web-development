import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
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

test("shows extended info", () => {
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
  const showButton = component.getByText("View");
  fireEvent.click(showButton);

  expect(component.container).toHaveTextContent("Some title");
  expect(component.container).toHaveTextContent("/some/url");
  expect(component.container).toHaveTextContent("3 likes");
});

test("calls like handler", () => {
  const blog = {
    title: "Some title",
    author: "The Author",
    user: {
      id: "123",
    },
    likes: 3,
    url: "/some/url",
  };

  const mockLikeHandler = jest.fn();
  const component = render(<Blog blog={blog} handleLike={mockLikeHandler} />);

  const showButton = component.getByText("View");
  fireEvent.click(showButton);
  const likeButton = component.getByText("Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
