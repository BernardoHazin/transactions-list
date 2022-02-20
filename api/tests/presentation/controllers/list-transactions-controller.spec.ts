import sinon from "sinon";
import { ListTransactionsController } from "@/presentation/controllers";
import { ListTransactionsMock } from "@/tests/presentation/mocks";
import { makeTransactionMock } from "@/tests/domain/mocks";
import { ok } from "@/presentation/helpers";

const createController = () => {
  const usecase = new ListTransactionsMock();
  const controller = new ListTransactionsController(usecase);
  return { usecase, controller };
};

describe("Presentation | Controllers | List transactions", () => {
  beforeEach(() => {
    sinon.restore();
  });

  test("Should return ok(200) with transactions list", async () => {
    const { controller, usecase } = createController();
    const params = { from: new Date(), to: new Date() };
    const transactions = [makeTransactionMock(), makeTransactionMock()];
    const spy = sinon.spy(usecase);

    usecase.setPayload(transactions);

    const result = await controller.handle(params);

    expect(spy.handle.calledOnce).toBe(true);
    expect(result).toStrictEqual(ok(transactions));
  });
});
