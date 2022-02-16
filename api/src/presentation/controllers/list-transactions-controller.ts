import { Controller } from "@/presentation/protocols";
import { ListTransactions } from "@/domain/usecases";
import { ok } from "@/presentation/helpers";

export default class ListTransactionsController implements Controller {
  constructor(private readonly listTransactions: ListTransactions) {}

  async handle(body: ListTransactionsController.Body) {
    const result = await this.listTransactions.handle(body);

    return ok(result);
  }
}

export namespace ListTransactionsController {
  export type Body = {
    from: Date;
    to: Date;
  };
}
