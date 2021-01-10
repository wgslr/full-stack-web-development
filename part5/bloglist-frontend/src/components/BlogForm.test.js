import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("Calls blog creator handler", () => {
  const addBlogMock = jest.fn();
  const component = render(<BlogForm addBlog={addBlogMock} />);

  const submitButton = component.getByText("Create");
  fireEvent.change(component.container.querySelector("#titleInput"), {
    target: { value: "some title" },
  });
  fireEvent.change(component.container.querySelector("#urlInput"), {
    target: { value: "some url" },
  });
  fireEvent.change(component.container.querySelector("#authorInput"), {
    target: { value: "some author" },
  });

  fireEvent.click(submitButton);

  expect(addBlogMock.mock.calls).toHaveLength(1);
  expect(addBlogMock.mock.calls[0]).toEqual([
    { title: "some title", author: "some author", url: "some url" },
  ]);
});
