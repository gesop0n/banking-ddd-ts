import { Cuid2Id } from "@/features/shared/core/domain/valueObject/Cuid2Id";

export class AccountId extends Cuid2Id {
	private constructor(value: string) {
		super(value);
	}

	static generate(): AccountId {
		return new AccountId(Cuid2Id.generateValue());
	}
}
