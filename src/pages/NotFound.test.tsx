import { create, act, ReactTestRenderer } from "react-test-renderer";
import NotFound from "./NotFound";

describe("Testing NotFound", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(<NotFound />);
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
