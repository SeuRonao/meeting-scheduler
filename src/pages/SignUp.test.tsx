import { create, act, ReactTestRenderer } from "react-test-renderer";
import SignUp from "./SignUp";

describe("Testing SignUp", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(<SignUp />);
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
