import { create, act, ReactTestRenderer } from "react-test-renderer";
import Home from "./Home";

describe("Testing Profile", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(<Home />);
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
