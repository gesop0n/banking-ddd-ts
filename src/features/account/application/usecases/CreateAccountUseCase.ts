import { AccountEntity } from "../../domain/entities/AccountEntity";
import type { IAccountRepository } from "../../domain/repository/IAccountRepository";
import { Money } from "../../domain/valueObjects/Money";

export type CreateAccountUseCaseInput = {
	ownername: string;
};

export type CreateAccountUseCaseOutput = {
	id: string;
	ownerName: string;
	balance: { amount: number; currency: string };
	status: "active" | "frozen";
	transactions: Array<{
		id: string;
		type: "deposit" | "withdrawal" | "transfer_in" | "transfer_out";
		amount: { amount: number; currency: string };
		occurredAt: Date;
		counterpartAccountId: string | null;
	}>;
};

/**
 * Scenario: 新しい口座が開設される
 *   Given: 口座を持っていない利用者が、自分の名義で口座を開設しようとしている
 *   When: 利用者が名義人名を指定して口座開設を申請する
 *   Then: 残高 0 円・有効状態の口座が作成され、利用者に口座情報が返される
 */
export class CreateAccountUseCase {
	constructor(private readonly accountRepository: IAccountRepository) {}

	async execute(
		input: CreateAccountUseCaseInput,
	): Promise<CreateAccountUseCaseOutput> {
		const account = this.buildNewAccount(input);
		await this.accountRepository.save(account);
		return this.toOutput(account);
	}

	private buildNewAccount(input: CreateAccountUseCaseInput): AccountEntity {
		return AccountEntity.create({
			balance: Money.create(0, "JPY"),
			ownerName: input.ownername,
			status: "active",
		});
	}

	private toOutput(account: AccountEntity): CreateAccountUseCaseOutput {
		const snapshot = account.snapshot();
		return {
			id: snapshot.id.toString(),
			ownerName: snapshot.ownerName,
			balance: snapshot.balance.toJson(),
			status: snapshot.status,
			transactions: snapshot.transactions.map((transaction) => {
				const t_snapshot = transaction.snapshot();
				return {
					id: t_snapshot.id.toString(),
					type: t_snapshot.type,
					amount: t_snapshot.amount.toJson(),
					occurredAt: t_snapshot.occurredAt,
					counterpartAccountId:
						t_snapshot.counterpartAccountId?.toString() || null,
				};
			}),
		};
	}
}
