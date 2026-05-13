banking-ddd-ts
---

「銀号口座 / 送金システム」の DDD + クリーンアーキテクチャ の実装例

# 機能概要

## ユースケース一覧

| # | UseCase | 説明 | 
|:-:|:-:|:-:|
| UC-1 | 口座開設 | 初期残高ゼロで口座を作成する |
| UC-2 | 入金 | 指定口座に金額を入金する | 
| UC-3 | 出金 | 指定口座から金額を出金する | 
| UC-4 | 送金 | 口座Aから口座Bへ金額を移動する | 
| UC-5 | 口座凍結 | 口座を操作不能にする | 
| UC-6 | 取引履歴取得 | 口座の入出金履歴を一覧取得する |

## ドメインモデル
```
Account（Aggregate Root）
├── id: AccountId         ← Value Object
├── ownerName: string
├── balance: Money        ← Value Object
├── status: AccountStatus ← "active" | "frozen"
└── transactions: Transaction[]  ← Entity

Transaction（Entity）
├── id: TransactionId     ← Value Object
├── type: "deposit" | "withdrawal" | "transfer_in" | "transfer_out"
├── amount: Money
├── occurredAt: Date
└── counterpartAccountId?: AccountId  ← 送金相手（送金時のみ）

Money（Value Object）
├── amount: number        ← 整数（円単位）
└── currency: "JPY"       ← 今回は JPY 固定
```

## ルール

**口座**
- 残高は0円以上を保つ(出金・送金時に残高不足なら拒否)
- 凍結口座は入金・出金・送金すべて不可
- 入金・出金額は1円以上

**送金**
- 同一口座への送金は不可
- 送金元・送金先の両口座がアクティブである必要がある


## Domain Error 一覧

| エラー | 発生条件 | 
|:-:|:-:|
| InsufficientFundsError | 残高 < 出金額 | 
| AccountFrozenError | 凍結口座への操作 | 
| InvalidAmountError | 金額が0円以下| 
| SameAccountTransferError | 送金元 = 送金先 | 
| AccountNotFoundError | 存在しない口座ID |


## Port
| Port | 用途 | 今回の実装 | 
|:-:|:-:|:-:|
| NotificationPort | 送金完了の通知 | コンソール出力のダミー実装 |

## 今回実装のスコープ外
- 通過換算(為替レート)
- 利息計算
- 認証・認可
- 複数通過
