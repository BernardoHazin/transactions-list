import sinon from "sinon";
import { GetTransactionDetailsRepositoryMock } from "@/tests/data/mocks";
import { DbGetTransactionDetails } from "@/data/usecases";

const createUsecase = () => {
  const repository = new GetTransactionDetailsRepositoryMock();
  const usecase = new DbGetTransactionDetails(repository);
  return { repository, usecase };
};

describe("Data | Usecases | Get transaction details", () => {
  beforeEach(() => {
    sinon.restore();
  });

  test("Should execute get transaction details repository", () => {
    const { repository, usecase } = createUsecase();
    const mock = sinon.mock(repository);
    const params = { transactionId: "1" };

    mock
      .expects("execute")
      .once()
      .withExactArgs(params.transactionId)
      .resolves({});

    usecase.handle(params);

    mock.verify();
  });
});
