import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import ContactForm from "./components/ContactForm";
import EventSlider from "./components/EventSlider";
import ArticleCard from "./components/ArticleCard";
import RevealSection from "./components/RevealSection";

async function getLatestEvents(): Promise<Event[]> {
  try {
    const data = await client.getList<Event>({
      endpoint: "blog",
      queries: {
        limit: 2,
        orders: "-date",
        fields: "id,title,date,thumbnail,summary",
      },
    });
    return data.contents;
  } catch {
    return [];
  }
}

export default async function Home() {
  const events = await getLatestEvents();

  return (
    <main className="pt-[72px]">
      {/* ヒーローセクション */}
      <section className="relative w-full h-[754px] bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
        <div className="relative z-10 text-center text-white">
          <p className="text-sm tracking-widest mb-4 opacity-80">KANDA Startup Commons</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            社会課題から、<br />次世代の豊かさへ
          </h1>
        </div>
      </section>

      {/* KSCとはセクション */}
      <section id="about" className="py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">KANDA Startup Commons とは</h2>
          <p className="text-lg text-gray-500 mb-16">社会課題から、次世代の豊かさへ</p>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <RevealSection className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              KANDA Startup Commonsが応援したいのは、
              一人ひとりから湧き上がる想いや社会課題の解決を出発点にしながら、
              その先にある次世代の豊かさを生み出そうとする挑戦です。
            </p>
            <p>
              「できなかったことを、できるようにする」だけでなく、
              「すでにある価値を、もっと面白く、もっと豊かにする」。
              その両方に向き合い、事業として継続していく意志と可能性を持つ挑戦を、私たちは大切にしています。
            </p>
            <p>
              社会性と事業性、理想と現実のあいだを行き来しながら、
              試し、学び、前に進もうとする人たちが集まる場を、神田からつくっていきます。
            </p>
          </RevealSection>
          <RevealSection delay="reveal-delay-2" className="rounded-2xl bg-gray-200 aspect-[5/4] flex items-center justify-center text-gray-400">
            <span>画像</span>
          </RevealSection>
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-16 items-start">
          <RevealSection className="rounded-2xl bg-gray-200 aspect-[5/4] flex items-center justify-center text-gray-400">
            <span>画像</span>
          </RevealSection>
          <RevealSection delay="reveal-delay-2" className="space-y-6 text-gray-700 leading-relaxed">
            <h3 className="text-2xl font-bold text-black">役割を持って持ち寄る</h3>
            <p>
              KANDA Startup Commonsは、参画する一人ひとりが、
              自分なりの役割を持って関わることを大切にしています。
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>こんな挑戦をしたい</li>
              <li>こんな応援があれば前に進めそう</li>
              <li>自分は、こんな形で力を貸せる</li>
            </ul>
            <p>
              それを言葉にして持ち寄ることで、一人ではできなかったことが、少しずつ動き出す。
              それぞれができることを少しずつ出し合えば、もっと大きな挑戦ができる。
            </p>
            <p>
              支援する・される、民間・行政、住む人・働く人。そうした垣根をこえて、
              一人ひとりのゆるやかな参加を通じて、共に創り上げていく。
              このまちに、そんな豊かな「共（Commons）」の土壌を育んでいきたいと、私たちは考えています。
            </p>
          </RevealSection>
        </div>
      </section>

      {/* 役割セクション */}
      <section id="roles" className="py-24 bg-gray-50 px-8">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-16">KANDA Startup Commons 内の役割</h2>
          </RevealSection>

          {/* スタートアップ会員 */}
          <div className="mb-20">
            <RevealSection>
              <h3 className="text-xl font-bold mb-2">スタートアップ会員</h3>
              <p className="text-gray-500 mb-8">◾︎ 挑戦者</p>
            </RevealSection>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <RevealSection className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  スタートアップの立ち上げ、新規事業、社会課題への挑戦。
                  まだ途中で、答えが見えていなくても構いません。
                  未完成なアイデアや問いが大歓迎です。
                </p>
                <p>
                  一人で抱え込まず、「何をやりたいか」「何に困っているか」を言葉にして、
                  参加してみてください。
                </p>
                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <p className="font-semibold text-black">役割：</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>事業や課題をオープンにし、挑戦を可視化</li>
                    <li>神田の場を実験フィールドとして活用</li>
                    <li>次の挑戦者への知見共有・応援</li>
                  </ul>
                  <p className="font-semibold text-black mt-4">主な権利：</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Open Day・会員限定イベントへの参加</li>
                    <li>サポート会員との壁打ち・マッチング機会</li>
                    <li>Commons公式メディア・登壇などの発信機会</li>
                    <li>テーマや場づくりへの意見参加</li>
                  </ul>
                </div>
              </RevealSection>
              <RevealSection delay="reveal-delay-2" className="rounded-2xl bg-gray-200 aspect-[4/5] flex items-center justify-center text-gray-400">
                <span>画像</span>
              </RevealSection>
            </div>
          </div>

          {/* サポート会員 */}
          <div>
            <RevealSection>
              <h3 className="text-xl font-bold mb-8">サポート会員</h3>
            </RevealSection>
            <div className="space-y-12">
              {[
                { role: "◾︎ 応援団", desc: "スタートアップの立ち上げ、新規事業、社会課題への挑戦。まだ途中で、答えが見えていなくても構いません。未完成なアイデアや問いが大歓迎です。" },
                { role: "◾︎ 盛り上げ隊", desc: "スタートアップの立ち上げ、新規事業、社会課題への挑戦。まだ途中で、答えが見えていなくても構いません。未完成なアイデアや問いが大歓迎です。" },
                { role: "◾︎ 助っ人団（盛り上げ隊）", desc: "スタートアップの立ち上げ、新規事業、社会課題への挑戦。まだ途中で、答えが見えていなくても構いません。未完成なアイデアや問いが大歓迎です。" },
              ].map((item) => (
                <div key={item.role} className="grid md:grid-cols-2 gap-12 items-start">
                  <RevealSection className="rounded-2xl bg-gray-200 aspect-[4/3] flex items-center justify-center text-gray-400">
                    <span>画像</span>
                  </RevealSection>
                  <RevealSection delay="reveal-delay-2" className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-gray-500">{item.role}</p>
                    <p>{item.desc}</p>
                  </RevealSection>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 過去のイベント実績セクション */}
      <section id="openday" className="py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">過去のイベント実績</h2>
          <p className="text-lg text-gray-500 mb-4">KANDA Open Day</p>
          <p className="text-gray-600 mb-8">
            多様なプレイヤーが気軽に集い、交流できる場として神田町でのイベントを定期的に開催しています。
          </p>
        </RevealSection>

        <RevealSection>
          <EventSlider />
        </RevealSection>

        <RevealSection className="mb-16">
          <a
            href="#"
            className="inline-block px-8 py-3 border border-gray-800 text-gray-800 rounded-full text-sm hover:bg-gray-800 hover:text-white transition-colors"
          >
            最新のイベント情報を確認する
          </a>
        </RevealSection>

        {/* microCMSから取得した記事カード */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.length > 0 ? (
            events.map((event, i) => (
              <ArticleCard
                key={event.id}
                href={`/events/${event.id}`}
                img={event.thumbnail?.url ?? ""}
                title={event.title}
                date={new Date(event.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).replace(/\//g, ".")}
                delay={i === 1 ? "reveal-delay-2" : ""}
              />
            ))
          ) : (
            // microCMSに記事がない場合のフォールバック
            <>
              <ArticleCard
                href="https://novolba.com/media/event260415/"
                img="/images/events/leftside.png"
                title="【イベントレポート】「KANDA Open Day@神田錦町」第2回を開催しました！"
                date="2026.04.15"
              />
              <ArticleCard
                href="https://novolba.com/media/event260303/"
                img="/images/events/rightside.png"
                title="【イベントレポート】「KANDA Open Day@神田錦町」第1回を開催しました！"
                date="2026.03.03"
                delay="reveal-delay-2"
              />
            </>
          )}
        </div>

        <RevealSection className="text-center">
          <a
            href="#"
            className="inline-block px-8 py-3 border border-gray-800 text-gray-800 rounded-full text-sm hover:bg-gray-800 hover:text-white transition-colors"
          >
            もっとみる
          </a>
        </RevealSection>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" className="py-24 bg-gray-50 px-8">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h2>
            <p className="text-gray-600 mb-12">
              多様なプレイヤーが気軽に集い、交流できる場として神田町でのイベントを定期的に開催しています。
            </p>
          </RevealSection>
          <RevealSection>
            <ContactForm />
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
