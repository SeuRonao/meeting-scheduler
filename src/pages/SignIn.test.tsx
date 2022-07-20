import { MemoryRouter } from "react-router-dom";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import SignIn from "./SignIn";

describe("Testing SignIn", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      );
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
