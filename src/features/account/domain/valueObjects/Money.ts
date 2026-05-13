import { DomainError } from "@/features/shared/core/domain/errors/DomainError";

type Currency = "JPY";

export class InvalidMoneyAmountError extends DomainError {
  constructor() {
    // Money は整数で0以上
    super("Amount must be integer and 0 or more.");
  }
}

export class MismatchCurrencyError extends DomainError {
  constructor() {
    super("Currency Mismatch");
  }
}

export class Money {
  private constructor(
    readonly amount: number,
    readonly currency: Currency,
  ) {
    Object.freeze(this);
  }

  static create(amount: number, currency: Currency): Money {
    if (!Number.isInteger(amount) || amount < 0) {
      throw new InvalidMoneyAmountError();
    }
    return new Money(amount, currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  toJson(): { amount: number; currency: Currency } {
    return {
      amount: this.amount,
      currency: this.currency,
    };
  }

  /*
    Moneyを足す
  */
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new MismatchCurrencyError();
    }

    return new Money(this.amount + other.amount, this.currency);
  }
}
