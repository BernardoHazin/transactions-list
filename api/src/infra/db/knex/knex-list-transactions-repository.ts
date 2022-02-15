import { ListTransactionsRepository } from "@/data/protocols/";
import { Transaction } from "@/domain/entities";
import knex from "knex";

export default class KnexListTransactionsRepository
  implements ListTransactionsRepository
{
  async execute({ filters }: ListTransactionsRepository.Params) {
    const queryBuilder = knex<Transaction>("transactions");

    Object.entries(filters).forEach(([filter, value]) => {
      queryBuilder.orWhere(filter, value);
    });

    return queryBuilder.select();
  }
}
