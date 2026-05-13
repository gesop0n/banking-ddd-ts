import { describe, expect, test } from "vitest";
import { InvalidMoneyAmountError, MismatchCurrencyError, Money } from "./Money";

describe("Money VO", () => {
	describe("🟢 正常系", () => {
		test("有効な整数 JPY で作成できる", () => {
			const money = Money.create(1000, "JPY");

			expect(money.amount).toEqual(1000);
			expect(money.currency).toEqual("JPY");
		});

		test("同値の Money は equals が true", () => {
			const money1 = Money.create(1000, "JPY");
			const money2 = Money.create(1000, "JPY");

			expect(money1.equals(money2)).toBe(true);
		});

		test("異なる値の Money は equals が false", () => {
			const money1 = Money.create(1000, "JPY");
			const money2 = Money.create(2000, "JPY");

			expect(money1.equals(money2)).toBe(false);
		});

		test("amount = 0 で作成できる（口座初期残高として有効）", () => {
			const money = Money.create(0, "JPY");

			expect(money.amount).toBe(0);
			expect(money.currency).toBe("JPY");
		});

		test("add で2つの Money を合算できる", () => {
			const money1 = Money.create(1000, "JPY");
			const money2 = Money.create(500, "JPY");

			const result = money1.add(money2);

			expect(result.amount).toBe(1500);
			expect(result.currency).toBe("JPY");
		});
	});

	describe("🟡 準正常系", () => {
		test("負の amount -> InvalidMoneyAmountError", () => {
			// expect(() => ...).toThrow(ErrorClass) でエラーが投げられることを検証する
			expect(() => Money.create(-1000, "JPY")).toThrow(InvalidMoneyAmountError);
		});

		test("小数の amount -> InvalidMoneyAmountError", () => {
			expect(() => Money.create(100.5, "JPY")).toThrow(InvalidMoneyAmountError);
		});

		test("異なる通貨同士の add -> MismatchCurrencyError", () => {
			// 現時点では JPY のみだが、将来の通貨追加に備えてエラーパスを保証する
			const jpy = Money.create(1000, "JPY");
			const other = { amount: 500, currency: "USD" } as unknown as Money;

			expect(() => jpy.add(other)).toThrow(MismatchCurrencyError);
		});
	});
});
