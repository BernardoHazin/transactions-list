import sinon from "sinon";
import { GetTransactionDetailsController } from "@/presentation/controllers";
import { GetTransactionDetailsMock } from "@/tests/presentation/mocks";
import { ok, notFound } from "@/presentation/helpers";

const createController = () => {
  const usecase = new GetTransactionDetailsMock();
  const controller = new GetTransactionDetailsController(usecase);
  return { usecase, controller };
};

describe("Presentation | Controllers | Get transaction details", () => {
  beforeEach(() => {
    sinon.restore();
  });

  test("Should return ok(200) with transaction details", async () => {
    const { controller, usecase } = createController();
    const params = { transactionId: "1" };
    const spy = sinon.spy(usecase);

    const result = await controller.handle(params);
    const expectedResult = await spy.handle.returnValues[0];

    expect(spy.handle.calledOnce).toBe(true);
    expect(result).toStrictEqual(ok(expectedResult));
  });

  test("Should return not found(404) if transaction does not exists", async () => {
    const { controller, usecase } = createController();
    const params = { transactionId: "1" };

    usecase.setPayload(null);

    const result = await controller.handle(params);

    expect(result).toStrictEqual(notFound());
  });
});
