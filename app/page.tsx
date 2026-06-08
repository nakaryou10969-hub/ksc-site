import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import ContactForm from "./components/ContactForm";
import EventSlider from "./components/EventSlider";
import ArticleCard from "./components/ArticleCard";
import RevealSection from "./components/RevealSection";
import SupportMemberCarousel from "./components/SupportMemberCarousel";
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
      <section
        className="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ minHeight: "clamp(300px, 50vw, 640px)" }}
      >
        {/* 背景画像 */}
        <Image
          src="/images/hero/hero1.png"
          alt="KANDA Startup Commons ヒーロー背景"
          fill
          className="object-cover object-center"
          priority
        />
        {/* オーバーレイ（文字を読みやすくするため薄い白） */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.45)" }} />

        {/* コンテンツ（前面） */}
        <div className="relative z-10 flex flex-col items-center pt-12 sm:pt-0">
          {/* ロゴ画像 */}
          <div className="relative" style={{ width: "clamp(160px, 28vw, 340px)", height: "clamp(160px, 28vw, 340px)" }}>
            <Image
              src="/images/events/ksc_logo_縁あり (1).png"
              alt="KANDA Startup Commons ロゴ"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* サイト名テキスト */}
          <p
            className="mt-4 text-center font-bold tracking-widest"
            style={{
              color: "#3B3C3E",
              fontSize: "clamp(14px, 2.2vw, 28px)",
              letterSpacing: "0.15em",
            }}
          >
            KANDA Startup Commons
          </p>
        </div>
      </section>

      {/* KSCとはセクション */}
      <section id="about" className="py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2>KANDA Startup Commons とは</h2>
          <h3 className="no-marker" style={{ color: "#3B3C3E" }}>社会課題から、次世代の豊かさへ</h3>
        </RevealSection>

        <div className="grid grid-cols-1 gap-16 items-start">
          <RevealSection className="space-y-6 leading-relaxed text-left" style={{ color: "#3B3C3E" }}>
            <p>
              KANDA Startup Commonsが応援したいのは、<br />
              一人ひとりから湧き上がる想いや社会課題の解決を出発点にしながら、
              その先にある次世代の豊かさを生み出そうとする挑戦です。
            </p>
            <p>
              「できなかったことを、できるようにする」だけでなく、
              「<span style={{ color: "#D94C0B" }}>すでにある価値を、もっと面白く、もっと豊かにする</span>」。<br />
              その両方に向き合い、事業として継続していく意志と可能性を持つ挑戦を、私たちは大切にしています。
            </p>
            <p>社会性と事業性、理想と現実のあいだを行き来しながら、</p>
            <p>
              <span style={{ color: "#D94C0B" }}>試し、学び、前に進もうとする人たちが集まる場を、神田から</span>つくっていきます。
            </p>
          </RevealSection>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-16 items-start">
          <RevealSection delay="reveal-delay-2" className="space-y-6 leading-relaxed">
            <h3 className="no-marker">役割を持って持ち寄る</h3>
            <p>
              KANDA Startup Commonsは、参画する一人ひとりが、
              <span style={{ color: "#D94C0B" }}>自分なりの役割を持って関わる</span>ことを大切にしています。
            </p>

            {/* 画像プレースホルダー W:1200 H:327 */}
            <div
              className="w-full rounded-2xl flex items-center justify-center"
              style={{ aspectRatio: "1200/327", backgroundColor: "#D6D3CD", color: "#767676" }}
            >
              <span>画像</span>
            </div>

            <p>
              持ち寄ることで一人ではできなかったことが、少しずつ動き出す。<br />
              それぞれができることを少しずつ出し合えば、もっと大きな挑戦ができる。
            </p>
            <p>
              支援する・される、民間・行政、住む人・働く人。そうした垣根をこえて、<br />
              一人ひとりのゆるやかな参加を通じて、共に創り上げていく。
            </p>
            <p>
              このまちに、そんな豊かな「<span style={{ color: "#C79500" }}>共（Commons）</span>」の土壌を育んでいきたいと、私たちは考えています。
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

          <RevealSection>
            <h3 className="no-marker">こんな人たちを募集しています</h3>
          </RevealSection>

          {/* 挑戦者 */}
          <div className="mb-20">
            <RevealSection>
              <h3>挑戦者</h3>
            </RevealSection>
            <RevealSection className="space-y-4 leading-relaxed mb-8" style={{ color: "#3B3C3E" }}>
              <p>
                スタートアップの立ち上げ、新規事業、社会課題への挑戦。<br />
                まだ途中で、答えが見えていなくても構いません。未完成なアイデアや問いが大歓迎です。
              </p>
            </RevealSection>

            {/* 挑戦者カード W:1083 H:315 比率 */}
            <RevealSection>
              <div
                className="relative w-full rounded-sm overflow-visible flex flex-col md:flex-row items-stretch"
                style={{ border: "2px solid #001597", aspectRatio: "1083/315", maxHeight: "315px", backgroundColor: "#ffffff" }}
              >
                {/* 左：画像エリア（challenger-nameとchallenger-1の重ね） */}
                <div className="relative shrink-0" style={{ width: "38%" }}>
                  {/* challenger-1.png（メイン画像）- ボックスからはみ出して上に */}
                  <div className="absolute" style={{ left: "22%", bottom: 0, width: "75%", aspectRatio: "413/395" }}>
                    <Image
                      src="/images/common/challenger-1.png"
                      alt="挑戦者"
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                  {/* challenger-name.png（縦テキスト装飾）*/}
                  <div className="absolute" style={{ left: "4%", top: "50%", transform: "translateY(-50%)", width: "14%", aspectRatio: "92/241" }}>
                    <Image
                      src="/images/common/challenger-name.png"
                      alt="challenger"
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>

                {/* 右：テキストエリア */}
                <div className="flex flex-col justify-center px-6 py-6 flex-1">
                  <p className="leading-relaxed" style={{ color: "#C79500" }}>
                    自ら旗を掲げて起業し、情熱をもって事業を推進するチャレンジャー。<br />
                    KANDA Startup Commonsの主役であり、<br />
                    自らの意思で世界を変えようと挑み続ける、熱い起業家たちです。
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* サポート会員 */}
          <div>
            <RevealSection>
              <h3>サポート会員</h3>
            </RevealSection>
            <RevealSection>
              <SupportMemberCarousel />
            </RevealSection>
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

        <RevealSection className="mb-16 text-center">
          <a
            href="https://peatix.com/group/16534116"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm hover:opacity-70 transition-opacity"
            style={{ backgroundColor: "#D94C0B", color: "#ffffff", borderRadius: "9999px" }}
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

        {/* もっとみるボタン（将来的に復活予定）
        <RevealSection className="text-center">
          <a
            href="#"
            className="inline-block px-8 py-3 border text-sm hover:opacity-70 transition-opacity"
            style={{ borderColor: "#3B3C3E", color: "#3B3C3E", borderRadius: "9999px" }}
          >
            もっとみる
          </a>
        </RevealSection>
        */}
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2>お問い合わせ</h2>
          </RevealSection>
          <RevealSection>
            <ContactForm />
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
