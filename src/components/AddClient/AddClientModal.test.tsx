import { create, act, ReactTestRenderer } from "react-test-renderer";
import AddClientModal from "./AddClientModal";

describe("Testing AddClientModal", () => {
  test("renders correctly when not shown", async () => {
    let component: ReactTestRenderer;
    await act(async () => {
      component = create(
        <AddClientModal show={false} setShow={(value) => !value} />
      );
    });
    expect(component!.toJSON()).toMatchSnapshot();
  });
});
