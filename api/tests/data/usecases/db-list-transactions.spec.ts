import sinon from "sinon";
import { ListTransactionsRepositoryMock } from "@/tests/data/mocks";
import { DbListTransactions } from "@/data/usecases";
import { addMonth, fromDate } from "@/utils";

const createUsecase = () => {
  const repository = new ListTransactionsRepositoryMock();
  const usecase = new DbListTransactions(repository);
  return { repository, usecase };
};

describe("Data | Usecases | List transactions", () => {
  afterEach(() => {
    sinon.restore();
  });

  test("Should execute list transaction repository for transaction list", () => {
    const { repository, usecase } = createUsecase();
    const mock = sinon.mock(repository);
    const startDate = new Date();
    const endDate = fromDate(startDate);
    addMonth(endDate, 1);
    const params = { from: startDate, to: endDate };

    mock.expects("execute").once().withExactArgs(params).resolves([]);

    usecase.handle(params);

    mock.verify();
  });
});
