DELETE FROM problems;
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b01', 'beginner', '#general', '[{"name": "佐藤（PM）", "body": "今日の朝会、始まります。進捗だけ一言ください。"}]', '了解です。今から参加します。', 'りょうかいです。いまからさんかします。', 90000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b02', 'beginner', '#pr-review', '[{"name": "高橋（先輩）", "body": "PR 見てもらえる？急がなくて大丈夫です。"}]', '確認します。少々お待ちください。', 'かくにんします。しょうしょうおまちください。', 110000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b03', 'beginner', '#incidents', '[{"name": "田中（SRE）", "body": "ステージングでログインできない、って声あります。"}]', '承知しました。原因を調べます。', 'しょうちしました。げんいんをしらべます。', 120000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b04', 'beginner', '#customer-success', '[{"name": "小林（CS）", "body": "お客様から、画面が白いと連絡が来ました。"}]', 'ありがとうございます。再現を試みます。', 'ありがとうございます。さいげんをこころみます。', 130000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b05', 'beginner', '#general', '[{"name": "佐藤（PM）", "body": "リリースノート、今日中に下書きありますか？"}]', '作成します。午後に共有します。', 'さくせいします。ごごにきょうゆうします。', 100000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b06', 'beginner', '#pr-review', '[{"name": "伊藤（QA）", "body": "テスト環境のアカウント、まだ使えますか？"}]', '使えます。必要なら権限を追加します。', 'つかえます。ひつようならけんげんをついかします。', 140000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b07', 'beginner', '#incidents', '[{"name": "田中（SRE）", "body": "デプロイ、少し遅れそうです。待ってもらえますか？"}]', '大丈夫です。準備して待ちます。', 'だいじょうぶです。じゅんびしてまちます。', 95000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b08', 'beginner', '#general', '[{"name": "高橋（先輩）", "body": "昼休み、何時に戻る予定？"}]', '十三時には戻ります。', 'じゅうさんじにはもどります。', 80000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b09', 'beginner', '#pr-review', '[{"name": "山田（デザ）", "body": "ボタンの文言、まだ仮です。あとで差し替えます。"}]', '了解です。仮のままで進めます。', 'りょうかいです。かりのままですすめます。', 100000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b10', 'beginner', '#customer-success', '[{"name": "小林（CS）", "body": "問い合わせ番号 42 の件、担当お願いできますか。"}]', '担当します。状況を整理します。', 'たんとうします。じょうきょうをせいりします。', 150000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b11', 'beginner', '#incidents', '[{"name": "田中（SRE）", "body": "ログ、見ました？エラー出てます。"}]', '見ました。続きを追います。', 'みました。つづきをおいます。', 110000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b12', 'beginner', '#general', '[{"name": "佐藤（PM）", "body": "明日のデモ、資料は最新版でお願いします。"}]', '最新版に更新しておきます。', 'さいしんばんにこうしんしておきます。', 160000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('b13', 'beginner', '#pr-review', '[{"name": "高橋（先輩）", "body": "コメント返したらマージして大丈夫です。"}]', '修正しました。マージします。', 'しゅうせいしました。まあじします。', 170000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i01', 'intermediate', '#pr-review', '[{"name": "佐藤（PM）", "body": "@you PR #123 のレビューお願いできますか？本番のログインがたまに落ちます。"}, {"name": "田中（SRE）", "body": "再現手順は Issue #88 に貼った。`5xx` がバーストしてる。"}]', '確認します。Issue #88 を起点に、認証まわりを優先して追います。', 'かくにんします。Issue #88 をきてんに、にんしょうまわりをゆうせんしておいます。', 280000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i02', 'intermediate', '#incidents', '[{"name": "田中（SRE）", "body": "ステージングの CPU が跳ねてます。直近のデプロイ、怪しくないですか。"}]', '直近のデプロイを切り戻す案も用意します。メトリクスを先に見ます。', 'ちょっきんのでぷろいをきりもどすあんもよういします。めとりくすをさきにみます。', 320000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i03', 'intermediate', '#customer-success', '[{"name": "小林（CS）", "body": "顧客の山田様から、請求画面が遅いと。今日中に一次回答ほしいです。"}]', '一次回答を起草します。原因仮説はキャッシュ枯渇です。', 'いちじかいとうをきそうします。げんいんかせつはきゃっしゅこかつです。', 300000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i04', 'intermediate', '#general', '[{"name": "佐藤（PM）", "body": "スプリントゴール、まだ危ないです。Issue #15 だけでも閉じたい。"}]', 'Issue #15 は今夜までに閉じます。範囲は最小に絞ります。', 'Issue #15 はこんやまでにとじます。はんいはさいしょうにしぼります。', 260000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i05', 'intermediate', '#pr-review', '[{"name": "高橋（先輩）", "body": "型エラー、CI で落ちてる。`tsc` 通してからで。"}]', '`tsc` を通しました。型の曖昧さを排除したので再実行お願いします。', '`tsc` をとおしました。かたのあいまいさをはいじょしたのでさいじっこうおねがいします。', 340000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i06', 'intermediate', '#incidents', '[{"name": "伊藤（QA）", "body": "決済のサンドボックス、タイムアウトします。再現率は半々くらい。"}]', '再現手順を固定します。タイムアウト値の妥当性から検証します。', 'さいげんてじゅんをこていします。たいむあうとちのだとうせいからけんしょうします。', 310000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i07', 'intermediate', '#pr-review', '[{"name": "山田（デザ）", "body": "空状態のコピー、まだ弱いです。もう少し安心感ほしい。"}]', '空状態の文言を再構成します。不安を煽らず、次の操作を明示します。', 'からじょうたいのぶんごんをさいこうせいします。ふあんをあおらず、つぎのそうさをめいじします。', 290000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i08', 'intermediate', '#general', '[{"name": "佐藤（PM）", "body": "@you 明日の顧客定例、技術側の説明お願いできますか。"}]', '引き受けます。障害の経緯と再発防止を、簡潔に説明します。', 'ひきうけます。しょうがいのけいいとさいはつぼうしを、かんけつにせつめいします。', 270000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i09', 'intermediate', '#incidents', '[{"name": "田中（SRE）", "body": "Alert が鳴り止みません。"}, {"name": "高橋（先輩）", "body": "閾値、先週緩めたばかりなんだけど。"}]', '閾値は戻さず、ノイズ源を切り分けます。誤検知なら抑制ルールを足します。', 'いきちはもどさず、のいずげんをきりわけます。ごけんちならよくせいるーるをたします。', 360000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i10', 'intermediate', '#customer-success', '[{"name": "小林（CS）", "body": "CSV 出力が文字化けする、とのこと。Excel で開いてるっぽいです。"}]', 'BOM 付き UTF-8 に揃えます。手順もドキュメントへ追記します。', 'BOM つき UTF-8 にそろえます。てじゅんもどきゅめんとへついきします。', 330000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i11', 'intermediate', '#pr-review', '[{"name": "高橋（先輩）", "body": "N+1、また混入してない？ダッシュボードが重い。"}]', 'クエリを集約しました。N+1 は潰したので、再計測をお願いします。', 'くえりをしゅうやくしました。N+1 はつぶしたので、さいけいそくをおねがいします。', 350000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i12', 'intermediate', '#general', '[{"name": "佐藤（PM）", "body": "金曜リリース、まだ黄色です。フィーチャーフラグで守れる？"}]', 'フラグで隔離します。本番直撃は避け、段階的に有効化します。', 'ふらぐでかくりします。ほんばんちょくげきはさけ、だんかいてきにゆうこうかします。', 300000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('i13', 'intermediate', '#incidents', '[{"name": "田中（SRE）", "body": "証明書の期限、来週です。更新手順、誰か持ってます？"}]', '手順は把握しています。更新枠を確保して、巻きで進めます。', 'てじゅんははあくしています。こうしんわくをかくほして、まきですすめます。', 250000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a01', 'advanced', '#incidents', '[{"name": "田中（SRE）", "body": "本番 5xx が連続。DB の接続数が上限に張り付いてます。"}, {"name": "佐藤（PM）", "body": "顧客影響の一次情報、今すぐほしい。"}]', '接続プールを即時縮退し、影響範囲を限定する。
原因は長寿命コネクションの漏洩と断定する。', 'せつぞくぷーるをそくじしゅくたいし、えいきょうはんいをげんていする。
げんいんはちょうじゅみょうこねくしょんのろうえいとだんていする。', 720000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a02', 'advanced', '#pr-review', '[{"name": "高橋（先輩）", "body": "この PR、抽象が勝ちすぎ。後から読めない。"}]', '過剰な抽象を解体し、手続きを露出させる。
可読性を、拡張性より優先する。', 'かじょうなちゅうしょうをかいたいし、てつづきをろしゅつさせる。
かどくせいを、かくちょうせいよりゆうせんする。', 680000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a03', 'advanced', '#customer-success', '[{"name": "小林（CS）", "body": "重要顧客が「データ消えた」と。バックアップは生きてる？"}]', '消失ではない。フィルタ条件の誤適用だ。
復元手順は不要。画面上の条件をリセットすれば足りる。', 'しょうしつではない。ふぃるたじょうけんのごてきようだ。
ふくげんてじゅんはふよう。がめんじょうのじょうけんをりせっとすればたりる。', 700000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a04', 'advanced', '#general', '[{"name": "佐藤（PM）", "body": "経営から、障害の再発防止を一文で、と。難しいのは分かってる。"}]', '監視の盲点を塞ぎ、デプロイを小さく分割する。それが再発防止の本体だ。', 'かんしのもうてんをふさぎ、でぷろいをちいさくぶんかつする。それがさいはつぼうしのほんたいだ。', 640000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a05', 'advanced', '#pr-review', '[{"name": "伊藤（QA）", "body": "フラキーな E2E が 3 本残ってます。"}, {"name": "高橋（先輩）", "body": "時間ないならスキップでいいよ、とまでは言わないけど。"}]', 'スキップは敗北だ。待機を明示し、競合を潰す。
`retry` に逃げず、原因を固定する。', 'すきっぷははいぼくだ。たいきをめいじし、きょうごうをつぶす。
`retry` ににげず、げんいんをこていする。', 760000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a06', 'advanced', '#incidents', '[{"name": "田中（SRE）", "body": "キャッシュの stampede、また来た。TTL 揃いすぎ。"}]', 'TTL に揺らぎを入れ、単一瞬間の再生成を禁ずる。
これが根本対応だ。', 'TTL にゆらぎをいれ、たんいつしゅんかんのさいせいせいをきんずる。
これがこんぽんたいおうだ。', 740000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a07', 'advanced', '#pr-review', '[{"name": "山田（デザ）", "body": "エラー文言が全部「失敗しました」。これじゃ次の手が分からない。"}]', '失敗の種別を分け、次手を一文で示す。
曖昧な謝罪は、信頼を削るだけだ。', 'しっぱいのしゅべつをわけ、つぎてをいちぶんでしめす。
あいまいなしゃざいは、しんらいをけずるだけだ。', 660000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a08', 'advanced', '#general', '[{"name": "佐藤（PM）", "body": "見積もり倍増の理由、技術側から説明して。"}]', '未知の結合試験が本体だ。実装そのものではない。
見積もりの増加は、リスクの可視化である。', 'みちのけつごうしけんがほんたいだ。じっそうそのものではない。
みつもりのぞうかは、りすくのかしかである。', 690000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a09', 'advanced', '#incidents', '[{"name": "田中（SRE）", "body": "カナリア 5% で既に悪化。全開は論外だよね。"}]', '即時ロールバックする。仮説が崩れた以上、前進に意味はない。', 'そくじろおるばっくする。かせつがくずれたいじょう、ぜんしんにいみはない。', 620000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a10', 'advanced', '#customer-success', '[{"name": "小林（CS）", "body": "SLA 違反になりそう。公式コメント草案、技術視点でお願い。"}]', '影響は検索の遅延に限定され、更新系は健全である。
復旧見込みは 30 分、再発防止は接続制限の見直しだ。', 'えいきょうはけんさくのちえんにげんていされ、こうしんけいはけんぜんである。
ふっきゅうみこみは 30 ふん、さいはつぼうしはせつぞくせいげんのみなおしだ。', 800000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a11', 'advanced', '#pr-review', '[{"name": "高橋（先輩）", "body": "`any` が残ってる。時間ないのは分かる。それでも。"}]', '`any` は負債の宣言だ。境界に型を置き、内部の曖昧さを閉じる。', '`any` はふさいのせんげんだ。きょうかいにかたをおき、ないぶのあいまいさをとじる。', 650000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a12', 'advanced', '#incidents', '[{"name": "伊藤（QA）", "body": "本番相当データでしか落ちないバグです。"}, {"name": "佐藤（PM）", "body": "マスキング環境、まだ使えないんだっけ。"}]', '本番相当の部分集合で再現する。全量コピーは不要だ。
機微は落とし、分布だけ残す。', 'ほんばんそうとうのぶぶんしゅうごうでさいげんする。ぜんりょうこぴーはふようだ。
きびはおとし、ぶんぷだけのこす。', 780000);
INSERT INTO problems (id, difficulty, channel, incoming_json, reply, yomi, base_reward) VALUES ('a13', 'advanced', '#general', '[{"name": "高橋（先輩）", "body": "オンコール今夜、引継ぎポイントだけ。"}]', '既知の障害は接続枯渇。症状は 5xx の偏り。
手順は縮退、観察、必要ならロールバック。以上だ。', 'きちのしょうがいはせつぞくこかつ。しょうじょうは 5xx のかたより。
てじゅんはしゅくたい、かんさつ、ひつようならろおるばっく。いじょうだ。', 710000);
