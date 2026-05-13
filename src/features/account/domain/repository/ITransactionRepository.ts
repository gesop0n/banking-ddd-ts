import type { TransactionEntity } from "../entities/TransactionEntity";

export interface ITransactionRepository {
	save(transaction: TransactionEntity): Promise<void>;
}
