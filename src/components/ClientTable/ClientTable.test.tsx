import { create, act, ReactTestRenderer } from "react-test-renderer";
import ClientTable from "./ClientTable";

describe("Testing SignIn", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(<ClientTable />);
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
