import { MemoryRouter } from "react-router-dom";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import Navigation from "./Navigation";

describe("Testing Navigation", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      );
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
