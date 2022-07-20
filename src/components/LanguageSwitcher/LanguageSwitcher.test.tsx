import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import LanguageSwitcher from "./LanguageSwitcher";

describe("Testing LanguageSwitcher", () => {
  test("renders correctly", () => {
    const component = renderer.create(
      <MemoryRouter>
        <LanguageSwitcher />
      </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
