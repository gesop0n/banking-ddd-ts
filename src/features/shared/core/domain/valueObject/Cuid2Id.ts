import { createId } from "@paralleldrive/cuid2";
import { DomainError } from "../errors/DomainError";

export class InvalidIdError extends DomainError {
	constructor(readonly id: string) {
		super(`Invalid ID: "${id}`);
	}
}

export abstract class Cuid2Id {
	private readonly value: string;

	protected constructor(value: string) {
		this.value = value;
		Object.freeze(this);
	}

	protected static parseValue(value: string): string {
		if (!value || value.trim() === "") {
			throw new InvalidIdError(value);
		}
		return value;
	}

	protected static generateValue(): string {
		return createId();
	}

	equals(other: Cuid2Id): boolean {
		return this.constructor === other.constructor && this.value === other.value;
	}

	toString(): string {
		return this.value;
	}
}
