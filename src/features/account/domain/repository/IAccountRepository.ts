import type { AccountEntity } from "../entities/AccountEntity";

export interface IAccountRepository {
	/** Account を永続化 */
	save(account: AccountEntity): Promise<void>;
}
