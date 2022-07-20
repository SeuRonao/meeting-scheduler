import renderer from "react-test-renderer";
import Copyright from "./Copyright";

describe("Testing Copyright", () => {
  test("renders correctly", () => {
    const component = renderer.create(<Copyright />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
