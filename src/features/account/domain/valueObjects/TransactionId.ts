import { Cuid2Id } from "@/features/shared/core/domain/valueObject/Cuid2Id";

export class TransactionId extends Cuid2Id {
  private constructor(value: string) {
    super(value);
  }
}
