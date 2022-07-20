import renderer from "react-test-renderer";
import App from "./App";

describe("Testing the APP", () => {
  test("renders correctly", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
