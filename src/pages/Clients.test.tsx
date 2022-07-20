import { create, act, ReactTestRenderer } from "react-test-renderer";
import Clients from "./Clients";

describe("Testing Clients", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(<Clients />);
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
