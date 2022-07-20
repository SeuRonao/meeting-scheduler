import { create, act, ReactTestRenderer } from "react-test-renderer";
import Schedule from "./Schedule";

describe("Testing Profile", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(<Schedule />);
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
