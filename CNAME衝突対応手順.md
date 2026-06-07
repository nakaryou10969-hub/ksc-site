# CNAME衝突エラー → サイト切替 完全手順書（改訂版 2026-05-22）

リョータくん向け。上から順番に実行すれば完了する設計です。
分からないところで止まったら、エラーメッセージ全文・スクショ・実行したコマンドを添えてSlackに投げてください。

> ⚠️ **この手順書は5/22に大幅改訂しました。** 外部からの実機検証で重要な事実が判明したので、Section 0 を必ず最初に読んでください。

---

## 0. 作業前に必ず読む（前回手順書との違い）

### 0-1. 重大な事実：NS委任は実はまだ完了していません

**結論**：ドメイン `novolba.com` の権威NSは、TLD（.com）レジストリ上では **まだ旧側（ボンレックス管理）のRoute53** を向いています。ノボルバ側のRoute53（`ns-253` 系）は、現状ではインターネットからの名前解決経路に入っていません。

#### エビデンス

```bash
# TLD(.com)サーバーに直接NSを問い合わせ
dig @a.gtld-servers.net novolba.com NS +noall +authority

# 結果
novolba.com.  172800  IN  NS  ns-280.awsdns-35.com.    ← 旧側
novolba.com.  172800  IN  NS  ns-951.awsdns-54.net.    ← 旧側
novolba.com.  172800  IN  NS  ns-1202.awsdns-22.org.   ← 旧側
novolba.com.  172800  IN  NS  ns-1880.awsdns-43.co.uk. ← 旧側
```

```bash
# 一般リゾルバ経由の名前解決
dig @8.8.8.8 novolba.com A +short

# 結果（旧EC2のApacheが応答中）
35.76.225.240
13.192.124.191
57.181.19.115
```

```bash
# 実アクセスも旧Apache(WordPress)に到達中
curl -sI https://novolba.com/ | head -3
# HTTP/2 200
# server: Apache/2.4.43 (Amazon) OpenSSL/1.0.2k-fips
```

#### なぜ「委任完了」と認識していたか（誤認の経緯）

前に確認に使った `dig NS novolba.com +short` の結果が `ns-253/939/1910/1271` 系（=ノボルバ側）だったので「委任完了」と判断しましたが、これは **ホストゾーン内のNSレコード** を見ていただけで **TLDの委任NS** ではありませんでした。

- `dig NS <domain>`（リゾルバ未指定）：リゾルバが委任先を辿った先のホストゾーンの中身を返す
- **TLDの委任NS** を見るには：`dig +trace <domain>` または `dig @a.gtld-servers.net <domain> NS`

旧Route53のホストゾーン内に `NSレコード: ns-253系` がたまたま書き込まれていたため、誤った結果が見えていた状態です。これはよくあるハマりどころで、誰でも一度はやらかします。気にしないで先に進みましょう。

### 0-2. 現状のサイト・メールは全て旧側経路で稼働中

- **サイト**：旧EC2のWordPress(Apache)に到達 → 200応答中
- **メール**：MX = Microsoft 365、SPF = M365+SES、Autodiscover = M365、DMARC = quarantine → すべて旧Route53ホストゾーンから配信、メール送受信は止まっていない

つまり「リョータくんが新Route53に投入した12レコード」は、現状では実効的に使われていません（NS委任が新側に切り替わって初めて有効になる）。

### 0-3. これにより手順がどう変わるか

前の手順書はStep 1-6でCNAME衝突対応とサイト切替が完了する設計でしたが、NS委任未完了という事実を踏まえて以下のStepを追加・修正します：

| Step | 内容 | 改訂版での位置づけ |
|---|---|---|
| 1〜5 | CNAME衝突対応 → 新CF設定 → Aliasレコード作成 | 既存通り（5-4「既存Aレコード削除」は不要なので削除） |
| **6（新規）** | 新Route53のメールレコード完全性チェック | NS委任切替前に必須 |
| **7（新規）** | NS委任切替（レジストラ操作） | サイト切替の真のトリガー |
| 8 | 動作確認 | TLD/一般リゾルバ/実HTTPS/メールを全部確認 |

### 0-4. 小倉から確認したいこと（リョータくんへの質問）

以下3点を作業着手前にSlackで教えてください：

1. **ドメイン `novolba.com` のレジストラ（管理元）はどこですか？**
   - Route53 Registrar / お名前.com / さくらインターネット / GoDaddy / その他
   - レジストラ管理画面のURLが分かれば添付
2. **レジストラの管理画面ログイン権限は誰が持っていますか？**
   - ノボルバ社内 / ボンレックス / リョータくん自身 / その他
3. **5/27 (水) 午前のサイト切替作業の中でNS委任切替まで含めて実施可能ですか？**
   - レジストラ権限のある人と日程調整が必要なら別日になる可能性あり

回答もらえたら、Step 7の具体的な操作手順を確定させます。

---

## 1. 状況サマリ（CNAME衝突の真因）

CloudFrontに `novolba.com` / `www.novolba.com` を代替ドメイン名として追加すると `CNAMEAlreadyExists` が出る件。

**真因**：別のAWSアカウント（旧運用元）のCloudFrontディストリビューションに、同じ代替ドメイン名がすでに登録されているため。

**Aレコード削除では解決しません**。CloudFrontのCNAME衝突チェックは「CloudFront distribution の代替ドメイン名」同士のみで、Route53のレコードやELBは対象外（AWS公式仕様）。

### 公式エビデンス

- [CNAMEs - Restrictions on using alternate domain names](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html)
  > "You cannot add an alternate domain name to a CloudFront distribution if the same alternate domain name already exists in another CloudFront distribution, **even if your AWS account owns the other distribution**."
- [Move an alternate domain name](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/alternate-domain-names-move.html)

---

## 2. 前提情報

| 項目 | 値 |
|---|---|
| ノボルバ側 CloudFront ディストリビューションID | `E16AYFZ46ZVV6E` |
| CloudFrontドメイン（Alias targetに使う） | `d1nqp9gphncdvt.cloudfront.net` |
| ノボルバ側 Route53 ホストゾーンID | `Z0623222199M3XVL9LLSY` |
| ノボルバ側 権威NS | `ns-253.awsdns-31.com` / `ns-939.awsdns-53.net` / `ns-1271.awsdns-30.org` / `ns-1910.awsdns-46.co.uk` |
| ACM証明書 ARN（us-east-1） | `arn:aws:acm:us-east-1:305678528731:certificate/bda4f609-333e-44db-8aab-0a59ba61acf7` |

---

## 3. 全体の流れ

```
Section 0: 確認質問への回答（小倉と認識合わせ）
   ↓
Step 1: 競合元のCFディストリビューションをCLIで特定
   ↓
Step 2: ボンレックスへ削除依頼
   ↓
Step 3: 削除完了の確認
   ↓
Step 4: 新CFに代替ドメイン名を追加
   ↓
Step 5: 新Route53にAliasレコード作成
   ↓
Step 6: 新Route53のメールレコード完全性チェック
   ↓
Step 7: NS委任切替（レジストラ操作）
   ↓
Step 8: 外側からの動作確認（サイト・メール）→ 完了！
```

所要時間目安：
- Step 1〜3：1〜2日（ボンレックスの対応待ち）
- Step 4〜6：1時間以内
- Step 7：レジストラ操作自体は5分、世界中への反映は最大48時間
- Step 8：反映完了確認まで含めて1日

---

## Step 1: 競合元のディストリビューションを特定

### 何をするか
AWSのCLIコマンドで「ノボルバドメインがどのアカウント・どのCloudFrontに登録されているか」を調べます。

### 1-1. CloudShellを起動

CloudShellは「AWSコンソール上でターミナルが使える」機能。CLIをPCにインストールしなくてOK。

1. ノボルバAWSコンソールにログイン
2. 画面右上のヘッダーにある **`>_`** マークをクリック
3. 「Welcome to AWS CloudShell」の黒い画面が出ればOK（初回起動は1〜2分）

### 1-2. コマンドを実行

CloudShellで以下を実行：

```bash
aws cloudfront list-conflicting-aliases \
  --alias novolba.com \
  --distribution-id E16AYFZ46ZVV6E
```

```bash
aws cloudfront list-conflicting-aliases \
  --alias www.novolba.com \
  --distribution-id E16AYFZ46ZVV6E
```

### 1-3. 結果をメモする

```json
{
    "ConflictingAliasesList": {
        "MaxItems": 100,
        "Quantity": 1,
        "Items": [
            {
                "Alias": "novolba.com",
                "DistributionId": "*******ABCDEF",
                "AccountId": "******112233"
            }
        ]
    }
}
```

- **DistributionId**（マスク含めて全部）
- **AccountId**（マスク含めて全部）

をメモ。

### つまづいたら
- `AccessDenied` → 小倉に連絡（IAMポリシー追加が必要）
- `Items` が空配列 `[]` → 競合が既に解消されている。Step 4へ
- `aws` コマンド未認識 → ローカルターミナルではなくCloudShellを使う

---

## Step 2: ボンレックスへ削除依頼

### 2-1. 依頼文（コピペ用）

`XXXX` / `XXXXX` をStep 1のAccountIdとDistributionIdに置き換えて送付：

```
お世話になっております。
ノボルバHP移行作業の件でご相談です。

ノボルバ側AWSアカウントの新CloudFrontに novolba.com / www.novolba.com を
独自ドメインとして追加しようとしたところ、以下のエラーが発生しました。

  CNAMEAlreadyExists
  One or more of the CNAMEs you provided are already associated
  with a different resource.

AWS公式仕様上、別のCloudFrontディストリビューションに同じ代替ドメイン名が
登録されている場合、その登録を削除しない限り、別のCloudFrontには追加できません
（参照: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html）。

こちらで競合元を特定したところ、貴社管理AWSアカウント（末尾: XXXX）の
CloudFrontディストリビューション（ID末尾: XXXXX）に
 - novolba.com
 - www.novolba.com
が代替ドメイン名として登録されているようです。

お手数ですが、以下の作業をお願いいたします。

【作業手順】
1. AWSマネジメントコンソールにログイン
2. サービス検索で「CloudFront」を開く
3. 左メニュー「Distributions」を選択
4. 該当ディストリビューション（ID末尾 XXXXX）の行をクリック
5. 「General」タブを選択
6. 「Settings」セクションの右上「Edit」ボタンをクリック
7. 「Alternate domain name (CNAME)」欄から以下2つの行を削除
    - novolba.com
    - www.novolba.com
8. 画面下部「Save changes」をクリック
9. ディストリビューション一覧に戻り、ステータスが「Deploying」→「Enabled（Deployed）」
   になるまで5〜15分待機
10. 完了したらご一報ください

【補足】
・ディストリビューション自体は削除不要です（代替ドメイン名の2行を消すだけ）
・Route53のレコードは触らなくて大丈夫です
  （CloudFrontのCNAME衝突チェックはRoute53レコードを対象としないため）

ご不明点があればお知らせください。
よろしくお願いいたします。
```

---

## Step 3: 削除完了の確認

ボンレックスから「完了」連絡が来たら、CloudShellでStep 1のコマンドを再実行：

```bash
aws cloudfront list-conflicting-aliases \
  --alias novolba.com \
  --distribution-id E16AYFZ46ZVV6E
```

```bash
aws cloudfront list-conflicting-aliases \
  --alias www.novolba.com \
  --distribution-id E16AYFZ46ZVV6E
```

**OK**：`Items: []`（空配列） → Step 4へ
**まだ残っている**：5〜10分置いて再実行。30分経っても消えなければボンレックスに再確認。

---

## Step 4: CloudFrontに代替ドメイン名を追加

### 4-1. ディストリビューションを開く

1. AWSコンソール上部の検索ボックスに「CloudFront」と入力 → クリック
2. 左メニュー **Distributions** をクリック
3. 一覧から ID `E16AYFZ46ZVV6E` の行をクリック

### 4-2. 設定編集

1. 上部タブの **General** をクリック
2. **Settings** セクションの右上 **Edit** ボタンをクリック

### 4-3. 代替ドメイン名を入力

1. **Alternate domain name (CNAME) - optional** 項目で **Add item** を2回クリック
2. 入力：
   - 1行目：`novolba.com`
   - 2行目：`www.novolba.com`

### 4-4. SSL証明書を選ぶ

1. **Custom SSL certificate - optional** のドロップダウンをクリック
2. 既存の `novolba.com` 証明書を選択
   - ARN: `arn:aws:acm:us-east-1:305678528731:certificate/bda4f609-333e-44db-8aab-0a59ba61acf7`

### 4-5. 保存

1. **Save changes** をクリック
2. ステータスが **Enabled（Deployed）** になるまで5〜15分待機

### つまづいたら
- 保存時に再度 `CNAMEAlreadyExists` → Step 3が不十分。ボンレックスに再確認
- 証明書が選択肢に出ない → us-east-1（バージニア北部）のACM証明書のみ表示される。なければ小倉に連絡

---

## Step 5: Route53でAliasレコードを作成

### 5-1. ホストゾーンを開く

1. AWSコンソール上部の検索で「Route 53」 → クリック
2. 左メニュー **Hosted zones** → `novolba.com`（ID: `Z0623222199M3XVL9LLSY`）をクリック

### 5-2. ルートドメインのAliasレコード作成

1. **Create record** をクリック
2. 入力：

| 項目 | 値 |
|---|---|
| Record name | （空欄） |
| Record type | `A – Routes traffic to an IPv4 address and some AWS resources` |
| Alias | **ON** |
| Route traffic to | `Alias to CloudFront distribution` |
| Choose distribution | `d1nqp9gphncdvt.cloudfront.net` |
| Routing policy | `Simple routing` |

3. **Create records** をクリック

### 5-3. `www` サブドメインのAliasレコード作成

1. もう一度 **Create record** をクリック
2. 入力：

| 項目 | 値 |
|---|---|
| Record name | `www` |
| Record type | `A` |
| Alias | **ON** |
| Route traffic to | `Alias to CloudFront distribution` |
| Choose distribution | `d1nqp9gphncdvt.cloudfront.net` |
| Routing policy | `Simple routing` |

3. **Create records** をクリック

### つまづいたら
- プルダウンに `d1nqp9gphncdvt.cloudfront.net` が出ない → Step 4のステータスがDeployedになっていない可能性

---

## Step 6: 新Route53のメールレコード完全性チェック

### 何をするか
Step 7（NS委任切替）の瞬間、メール配信は新Route53の中身に依存します。**新Route53に必要なレコードが全部揃っていない状態で委任を切ると、メールが止まります**。事前に全件確認します。

### 6-1. CloudShellで以下を実行

権威NS（`ns-253.awsdns-31.com`）に直接問い合わせて、12レコード全てが入っているか確認：

```bash
echo "=== MX ==="
dig @ns-253.awsdns-31.com MX novolba.com +short
# 期待: 0 novolba-com.mail.protection.outlook.com.

echo "=== TXT (SPF/M365/Google) ==="
dig @ns-253.awsdns-31.com TXT novolba.com +short
# 期待: 5行（MS=ms77204597 / v=spf1... / google-site-verification ×3）

echo "=== Autodiscover ==="
dig @ns-253.awsdns-31.com CNAME autodiscover.novolba.com +short
# 期待: autodiscover.outlook.com.

echo "=== DMARC ==="
dig @ns-253.awsdns-31.com TXT _dmarc.novolba.com +short
# 期待: "v=DMARC1;p=quarantine;pct=100;fo=1"

echo "=== SES verification ==="
dig @ns-253.awsdns-31.com TXT _amazonses.novolba.com +short
# 期待: "HjH9aZhgGIfUVZpe7zitMH/mxAQ+useLbns92IzCZEw="

echo "=== SES DKIM #1 ==="
dig @ns-253.awsdns-31.com CNAME cmwtxvyulrs7etp6hghioxcdffq2vj6g._domainkey.novolba.com +short
echo "=== SES DKIM #2 ==="
dig @ns-253.awsdns-31.com CNAME fiqpvdywtsg3sijnpw277p3wvjx72jdr._domainkey.novolba.com +short
echo "=== SES DKIM #3 ==="
dig @ns-253.awsdns-31.com CNAME gczzs6h6fh4tlx7cahbp3nwxu35mcciv._domainkey.novolba.com +short
echo "=== SES DKIM #4 ==="
dig @ns-253.awsdns-31.com CNAME hncmom62tcc2aujcseai7aotcx5p5ukn._domainkey.novolba.com +short
echo "=== SES DKIM #5 ==="
dig @ns-253.awsdns-31.com CNAME wjs37hazyfrueukstztn74cezs6ci4xl._domainkey.novolba.com +short

echo "=== HubSpot DKIM #1 ==="
dig @ns-253.awsdns-31.com CNAME hs1-43888819._domainkey.novolba.com +short
# 期待: novolba-com.hs18a.dkim.hubspotemail.net.

echo "=== HubSpot DKIM #2 ==="
dig @ns-253.awsdns-31.com CNAME hs2-43888819._domainkey.novolba.com +short
# 期待: novolba-com.hs18b.dkim.hubspotemail.net.

echo "=== Aレコード (CloudFront Alias) ==="
dig @ns-253.awsdns-31.com A novolba.com +short
# 期待: CloudFrontのIP（複数）
dig @ns-253.awsdns-31.com A www.novolba.com +short
# 期待: CloudFrontのIP（複数）
```

### 6-2. チェックポイント

- ✅ MX / TXT / Autodiscover / DMARC / SES verification → 期待値の通り
- ✅ SES DKIM 5本 → すべて `<セレクタ>.dkim.amazonses.com.` を返す
- ✅ HubSpot DKIM 2本 → 期待値の通り
- ✅ A レコード（ルート / www）→ CloudFrontのIPが返る（Step 5で作成済みのため）

**1つでも欠けていたらNS委任切替に進まないこと。**

### つまづいたら
- どれかのレコードが空欄 → Route53コンソールでホストゾーン内に該当レコードが本当にあるか確認。なければ `Route53レコード投入手順.md` を見て該当レコードを再投入
- 期待値と違う値が返る → 入力ミスの可能性。該当レコードを編集

---

## Step 7: NS委任を新Route53に切替

### 何をするか
ドメインのレジストラ（管理元）の設定画面で、権威NSを **旧の `ns-280` 系から新の `ns-253` 系に変更** します。これがサイト切替の真のトリガーです。

### 7-1. 事前準備

以下を確認しておく：

- ✅ Step 5までの作業が完了している（CFに代替ドメイン名追加 + Aliasレコード作成）
- ✅ Step 6のメールレコード完全性チェックが全件パス
- ✅ レジストラの管理画面ログイン情報を持っている（Section 0-4の確認質問でリョータくんに確認済み）

### 7-2. レジストラ画面でNS変更

> ⚠️ レジストラの具体的なUIは管理元によって異なります。以下は一般的な手順です。
> リョータくんから「レジストラはここ」と教えてもらえたら、小倉が具体的な画面手順を補足します。

一般的な操作：
1. レジストラの管理画面にログイン
2. ドメイン一覧から `novolba.com` を選択
3. 「ネームサーバー設定」「NS設定」「DNS設定」等のメニューを開く
4. 現在の設定（旧側 `ns-280` 系）を以下4つに置き換える：
   ```
   ns-253.awsdns-31.com
   ns-939.awsdns-53.net
   ns-1271.awsdns-30.org
   ns-1910.awsdns-46.co.uk
   ```
5. 保存

### 7-3. 反映確認

切替後、5分〜48時間で世界中に伝播します。CloudShellで進捗を確認：

```bash
# TLDサーバーへの反映確認（最も早く反映される）
dig @a.gtld-servers.net novolba.com NS +short
# 期待: ns-253系 / ns-939系 / ns-1271系 / ns-1910系
```

切替直後はまだ旧NSが返ることがあります。15分後くらいから新NSが返り始めればOK。

```bash
# 一般リゾルバ経由の反映確認（こちらは時間がかかる）
dig @8.8.8.8 novolba.com NS +short
# 同様に新NSが返れば反映完了
```

### 7-4. 切替直後の挙動

NS委任切替後の世界中のキャッシュ事情：
- **TLDサーバー**：即〜数十分で反映
- **GoogleやCloudflareの公開リゾルバ**：数分〜数時間
- **各ISPやエンドユーザー端末**：数時間〜48時間
- **古いキャッシュを掴んでいるユーザー**：旧サイトに行き続ける

そのため、切替直後にも旧EC2サーバーを停止しないこと（CLAUDE.mdに記載の通り）。

### つまづいたら
- レジストラの権限がない → 権限のある人（ノボルバ社内 / ボンレックス）に依頼
- どこがレジストラか分からない → `whois novolba.com` の結果に登録機関の情報が出る。小倉に確認依頼

---

## Step 8: 外側からの動作確認

### 8-1. DNS反映の総合チェック

CloudShellで実行：

```bash
# TLDレベルの委任NS（最も信頼できる確認）
dig @a.gtld-servers.net novolba.com NS +short

# 一般リゾルバ経由
dig +trace novolba.com A 2>&1 | tail -15

# 一般リゾルバ経由でAレコード（CloudFrontのIPが返ればOK）
dig @8.8.8.8 novolba.com A +short
dig @8.8.8.8 www.novolba.com A +short

# 念のため権威NS直問い合わせ
dig @ns-253.awsdns-31.com A novolba.com +short
dig @ns-253.awsdns-31.com A www.novolba.com +short
```

期待結果：
- TLD NSが `ns-253` 系
- AレコードがCloudFrontのIP（複数。35.x.x.x ではなく CloudFront のIPレンジ）

### 8-2. HTTPS疎通確認

```bash
curl -I https://novolba.com/
curl -I https://www.novolba.com/
```

レスポンスヘッダに以下があればCloudFront経由：
```
x-amz-cf-id: xxxxxxxxx
via: 1.1 xxxxxxxxxxxxxxxxxxxx.cloudfront.net (CloudFront)
```

`server: Apache/2.4.43` が返っていたら **まだ旧EC2に到達** している（=DNSキャッシュが古い）。30分置いてから再確認、またはローカルDNSキャッシュをクリア：

```bash
# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
# Linux
sudo systemctl restart systemd-resolved
```

### 8-3. ブラウザ確認

1. ブラウザの **シークレットウィンドウ** で `https://novolba.com/` と `https://www.novolba.com/` を開く
2. 確認：
   - 新サイト（CloudFront経由）が正しく表示される
   - 鍵マーク（証明書エラーなし）
   - 鍵マーク → 証明書を見て `novolba.com` または `*.novolba.com` の証明書が使われている

### 8-4. メール疎通確認

```bash
# 一般リゾルバ経由でMX確認
dig @8.8.8.8 MX novolba.com +short
# 期待: 0 novolba-com.mail.protection.outlook.com.
```

実際のメール送受信テスト：
1. 外部メールアドレス（Gmail等）から `wen.deng@novolba.com` 等の社内アドレス宛にメール送信 → Outlookで受信できる
2. ノボルバ社員から外部メールアドレス宛にメール送信 → 相手側で受信、メールヘッダの `Authentication-Results: dkim=pass` を確認

### つまづいたら
- `dig +trace` でTLDが新NSを向いていない → Step 7の反映待ち。最大48時間
- TLDは新NSになったが一般リゾルバが旧IPを返す → リゾルバキャッシュ待ち。24〜48時間
- ブラウザでCloudFrontに繋がらない → ローカルキャッシュ。シークレットウィンドウで再試行
- メールが届かない → Step 6に戻ってレコード再確認

---

## 完了したら

サイトが新CloudFrontで正常表示され、メール送受信に問題がなければ：

1. ボンレックスに「切替完了しました、ありがとうございました」と一報
2. 小倉にもSlackで完了報告
3. 48時間〜1週間、メールが止まっていないかモニター
4. その後、旧EC2 WordPressサーバーの停止について別途相談

お疲れさまでした！

---

## 5/27（水）午前のサポート体制

- 小倉がSlackで待機しています。詰まったら **エラーメッセージ全文・スクショ・実行したコマンド** を添えて投げてください
- 即返します
- **Kiroの分析と矛盾するアドバイスが出たら、鵜呑みにせず一度小倉に確認してください**
  - 今回みたいに、Kiroが途中で結論を変えたり、見落としがあったりすることがあります
  - AWSの仕様は **公式ドキュメント + 実機検証（dig / curl）** が正解です

---

## 付録：今回の改訂で変わったこと（前回手順書との差分）

| 箇所 | 変更内容 |
|---|---|
| Section 0 | 新規追加：NS委任未完了の発覚、誤認の経緯、確認質問 |
| Step 5-4「既存Aレコード削除」 | 削除（ノボルバ側にはAレコードは存在しないため不要） |
| Step 6（新規） | 新Route53のメールレコード完全性チェック |
| Step 7（新規） | NS委任切替（レジストラ操作） |
| Step 8 | TLD/一般リゾルバ/dig +trace を使った外側からの確認に強化 |
