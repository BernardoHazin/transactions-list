import { Controller } from "@/presentation/protocols";
import { GetTransactionDetails } from "@/domain/usecases";
import { ok, notFound } from "@/presentation/helpers";

export default class GetTransactionDetailsController implements Controller {
  constructor(private readonly getTransactionDetails: GetTransactionDetails) {}

  async handle(body: GetTransactionDetailsController.Body) {
    const { transactionId } = body;
    const result = await this.getTransactionDetails.handle({ transactionId });

    if (!result) {
      return notFound();
    }

    return ok(result);
  }
}

export namespace GetTransactionDetailsController {
  export type Body = { transactionId: string };
}
