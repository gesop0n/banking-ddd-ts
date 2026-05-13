import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// `describe`, `it`, `expect`, `beforeEach` などのテスト関数を import なしでグローバルに使用できるようになる
		globals: true,

		environment: "node",

		include: ["src/**/*.unit.test.ts"],

		// モック関数の呼び出し履歴・戻り値・実装をすべてリセット
		mockReset: true,

		restoreMocks: true,
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
