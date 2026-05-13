import { AccountId } from "../valueObjects/AccountId";
import type { Money } from "../valueObjects/Money";
import type { TransactionEntity } from "./TransactionEntity";

type AccountStatus = "active" | "frozen";

export type AccountEntityProps = {
	readonly id: AccountId;
	readonly ownerName: string;
	readonly balance: Money;
	readonly status: AccountStatus;
	readonly transactions: TransactionEntity[];
};

export type NewAccountProps = {
	readonly ownerName: string;
	readonly balance: Money;
	readonly status: AccountStatus;
};

export class AccountEntity {
	private constructor(private props: AccountEntityProps) {}

	static create(props: NewAccountProps): AccountEntity {
		return new AccountEntity({
			...props,
			id: AccountId.generate(),
			transactions: [],
		});
	}

	snapshot(): AccountEntityProps {
		return { ...this.props };
	}
}
