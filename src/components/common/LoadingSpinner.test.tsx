import renderer from "react-test-renderer";
import LoadingSpinner from "./LoadingSpinner";

describe("Testing LoadingSpinner", () => {
  test("renders correctly", () => {
    const component = renderer.create(<LoadingSpinner />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
