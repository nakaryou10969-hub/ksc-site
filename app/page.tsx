import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import ContactForm from "./components/ContactForm";
import EventSlider from "./components/EventSlider";
import ArticleCard from "./components/ArticleCard";
import RevealSection from "./components/RevealSection";
import Image from "next/image";

async function getLatestEvents(): Promise<Event[]> {
  try {
    const data = await client.getList<Event>({
      endpoint: "blog",
      queries: { limit: 2, orders: "-date", fields: "id,title,date,eyecatch" },
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
      <section className="relative w-full h-[754px] overflow-hidden">
        <Image
          src="/images/events/TOP画像.png"
          alt="KANDA Startup Commons"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* KSCとはセクション */}
      <section id="about" className="py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2>KANDA Startup Commons とは</h2>
          <p>社会課題から、次世代の豊かさへ</p>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <RevealSection className="space-y-6 leading-relaxed" style={{ color: "#3B3C3E" }}>
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
          <RevealSection delay="reveal-delay-2" className="rounded-2xl aspect-[5/4] flex items-center justify-center" style={{ backgroundColor: "#D6D3CD", color: "#767676" }}>
            <span>画像</span>
          </RevealSection>
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-16 items-start">
          <RevealSection className="rounded-2xl aspect-[5/4] flex items-center justify-center" style={{ backgroundColor: "#D6D3CD", color: "#767676" }}>
            <span>画像</span>
          </RevealSection>
          <RevealSection delay="reveal-delay-2" className="space-y-6 leading-relaxed">
            <h3>役割を持って持ち寄る</h3>
            <p>
              KANDA Startup Commonsは、参画する一人ひとりが、
              自分なりの役割を持って関わることを大切にしています。
            </p>
            <ul className="space-y-2" style={{ color: "#585858" }}>
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
      <section id="roles" className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <h2>KANDA Startup Commons 内の役割</h2>
          </RevealSection>

          {/* スタートアップ会員 */}
          <div className="mb-20">
            <RevealSection>
              <h3>スタートアップ会員</h3>
              <p>◾︎ 挑戦者</p>
            </RevealSection>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <RevealSection className="space-y-4 leading-relaxed" style={{ color: "#3B3C3E" }}>
                <p>
                  スタートアップの立ち上げ、新規事業、社会課題への挑戦。
                  まだ途中で、答えが見えていなくても構いません。
                  未完成なアイデアや問いが大歓迎です。
                </p>
                <p>
                  一人で抱え込まず、「何をやりたいか」「何に困っているか」を言葉にして、
                  参加してみてください。
                </p>
                <div className="mt-6 space-y-3">
                  <p className="font-semibold" style={{ color: "#3B3C3E" }}>役割：</p>
                  <ul className="space-y-1 list-disc list-inside" style={{ color: "#585858" }}>
                    <li>事業や課題をオープンにし、挑戦を可視化</li>
                    <li>神田の場を実験フィールドとして活用</li>
                    <li>次の挑戦者への知見共有・応援</li>
                  </ul>
                  <p className="font-semibold mt-4" style={{ color: "#3B3C3E" }}>主な権利：</p>
                  <ul className="space-y-1 list-disc list-inside" style={{ color: "#585858" }}>
                    <li>Open Day・会員限定イベントへの参加</li>
                    <li>サポート会員との壁打ち・マッチング機会</li>
                    <li>Commons公式メディア・登壇などの発信機会</li>
                    <li>テーマや場づくりへの意見参加</li>
                  </ul>
                </div>
              </RevealSection>
              <RevealSection delay="reveal-delay-2" className="rounded-2xl aspect-[4/5] flex items-center justify-center" style={{ backgroundColor: "#D6D3CD", color: "#767676" }}>
                <span>画像</span>
              </RevealSection>
            </div>
          </div>

          {/* サポート会員 */}
          <div>
            <RevealSection>
              <h3>サポート会員</h3>
            </RevealSection>
            <div className="space-y-12">
              {[
                { role: "◾︎ 応援団", desc: "スタートアップの立ち上げ、新規事業、社会課題への挑戦。まだ途中で、答えが見えていなくても構いません。未完成なアイデアや問いが大歓迎です。" },
                { role: "◾︎ 盛り上げ隊", desc: "スタートアップの立ち上げ、新規事業、社会課題への挑戦。まだ途中で、答えが見えていなくても構いません。未完成なアイデアや問いが大歓迎です。" },
                { role: "◾︎ 助っ人団（盛り上げ隊）", desc: "スタートアップの立ち上げ、新規事業、社会課題への挑戦。まだ途中で、答えが見えていなくても構いません。未完成なアイデアや問いが大歓迎です。" },
              ].map((item) => (
                <div key={item.role} className="grid md:grid-cols-2 gap-12 items-start">
                  <RevealSection className="rounded-2xl aspect-[4/3] flex items-center justify-center" style={{ backgroundColor: "#D6D3CD", color: "#767676" }}>
                    <span>画像</span>
                  </RevealSection>
                  <RevealSection delay="reveal-delay-2" className="space-y-4 leading-relaxed">
                    <p style={{ color: "#767676" }}>{item.role}</p>
                    <p style={{ color: "#3B3C3E" }}>{item.desc}</p>
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
          <h2>過去のイベント</h2>
          <h3 style={{ color: "#D94C0B" }}>KANDA Open Day</h3>
          <p>
            多様なプレイヤーが気軽に集い、交流できる場として神田町でのイベントを定期的に開催しています。
          </p>
        </RevealSection>

        <RevealSection>
          <EventSlider />
        </RevealSection>

        <RevealSection className="mb-16">
          <a
            href="#"
            className="inline-block px-8 py-3 border text-sm hover:opacity-70 transition-opacity"
            style={{ borderColor: "#3B3C3E", color: "#3B3C3E", borderRadius: "9999px" }}
          >
            最新のイベント情報を確認する
          </a>
        </RevealSection>

        {/* 記事カード */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.length > 0 ? (
            events.map((event, i) => (
              <ArticleCard
                key={event.id}
                href={`/events/${event.id}/`}
                img={event.eyecatch?.url ?? ""}
                title={event.title}
                date={event.date
                  ? new Date(event.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).replace(/\//g, ".")
                  : ""}
                delay={i === 1 ? "reveal-delay-2" : ""}
              />
            ))
          ) : (
            <>
              <ArticleCard
                href="https://novolba.com/media/event260415/"
                img="/images/events/leftside.png"
                title="【イベントレポート】「KANDA Open Day@神田錦町」第2回を開催しました！"
                date="2026.04.15"
                external
              />
              <ArticleCard
                href="https://novolba.com/media/event260303/"
                img="/images/events/rightside.png"
                title="【イベントレポート】「KANDA Open Day@神田錦町」第1回を開催しました！"
                date="2026.03.03"
                delay="reveal-delay-2"
                external
              />
            </>
          )}
        </div>

        <RevealSection className="text-center">
          <a
            href="#"
            className="inline-block px-8 py-3 border text-sm hover:opacity-70 transition-opacity"
            style={{ borderColor: "#3B3C3E", color: "#3B3C3E", borderRadius: "9999px" }}
          >
            もっとみる
          </a>
        </RevealSection>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2>お問い合わせ</h2>
            <p style={{ color: "#585858" }} className="mb-12">
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
