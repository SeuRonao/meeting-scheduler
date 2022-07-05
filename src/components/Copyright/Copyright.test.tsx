import { render, screen } from "@testing-library/react";
import Copyright from "./Copyright";

test("renders name of site author", () => {
  render(<Copyright />);
  const component = screen.getByRole("link");
  expect(component).toHaveTextContent("Ronan Soares");
});

test("renders link to site author", () => {
  render(<Copyright />);
  const component = screen.getByRole("link");
  expect(component).toHaveAttribute("href", "https://seuronao.github.io");
});
