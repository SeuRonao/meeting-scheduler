import { render, screen } from "@testing-library/react";
import Copyright from "./Copyright";

describe("Testing Copyright", () => {
  test("renders name of site author", () => {
    render(<Copyright />);
    const componentList = screen.getAllByRole("link");
    const linkToProfile = componentList.filter((component) => {
      return component.textContent?.includes("Ronan Soares");
    });
    expect(linkToProfile.length).toEqual(1);
  });

  test("renders link to site author", () => {
    render(<Copyright />);
    const componentList = screen.getAllByRole("link");
    const linkToProfile = componentList.filter((component) => {
      return component.textContent?.includes("Ronan");
    });
    expect(linkToProfile.pop()).toHaveAttribute(
      "href",
      "https://seuronao.github.io"
    );
  });
});
