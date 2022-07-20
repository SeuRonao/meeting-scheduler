import { create, act, ReactTestRenderer } from "react-test-renderer";
import AddClient from "./AddClient";

describe("Testing AddClient", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(<AddClient />);
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
