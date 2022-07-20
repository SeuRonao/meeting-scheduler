import { MemoryRouter } from "react-router-dom";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import Profile from "./Profile";

describe("Testing Profile", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      );
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
