import type { AccountId } from "../valueObjects/AccountId";
import type { Money } from "../valueObjects/Money";
import { TransactionId } from "../valueObjects/TransactionId";

type TransactionType =
	| "deposit"
	| "withdrawal"
	| "transfer_in"
	| "transfer_out";

export type TransactionEntityProps = {
	readonly id: TransactionId;
	readonly type: TransactionType;
	readonly amount: Money;
	readonly occurredAt: Date;
	readonly counterpartAccountId: AccountId | null;
};

export type NewTransactionProps = {
	readonly type: TransactionType;
	readonly amount: Money;
	readonly occurredAt: Date;
	readonly counterpartAccountId: AccountId | null;
};

export class TransactionEntity {
	private constructor(private props: TransactionEntityProps) {}

	static create(props: NewTransactionProps) {
		return new TransactionEntity({
			...props,
			id: TransactionId.generate(),
		});
	}

	snapshot(): TransactionEntityProps {
		return { ...this.props };
	}
}
