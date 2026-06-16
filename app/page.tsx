import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import ContactForm from "./components/ContactForm";
import EventSlider from "./components/EventSlider";
import ArticleCard from "./components/ArticleCard";
import RevealSection from "./components/RevealSection";
import Image from "next/image";
import MemberCardMobile from "./components/MemberCardMobile";

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
      {/* PC版 */}
      <section
        className="relative w-full overflow-hidden hidden md:flex flex-col items-center justify-center"
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
        {/* オーバーレイ */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.45)" }} />
        {/* コンテンツ（前面） */}
        <div className="relative z-10 flex flex-col items-center pt-12 sm:pt-0">
          <div className="relative" style={{ width: "clamp(160px, 28vw, 340px)", height: "clamp(160px, 28vw, 340px)" }}>
            <Image
              src="/images/events/ksc_logo_縁あり (1).png"
              alt="KANDA Startup Commons ロゴ"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p
            className="mt-4 text-center font-bold tracking-widest"
            style={{ color: "#3B3C3E", fontSize: "clamp(14px, 2.2vw, 28px)", letterSpacing: "0.15em" }}
          >
            KANDA Startup Commons
          </p>
        </div>
      </section>

      {/* スマホ版ヒーロー */}
      <section className="relative w-full md:hidden" style={{ height: "500px" }}>
        <Image
          src="/images/events/phone_hero.png"
          alt="KANDA Startup Commons スマホヒーロー"
          fill
          className="object-cover object-center"
          priority
        />
        {/* ロゴをオーバーレイ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative" style={{ width: "55vw", height: "55vw", maxWidth: "260px", maxHeight: "260px" }}>
            <Image
              src="/images/events/ksc_logo_縁あり (1).png"
              alt="KANDA Startup Commons ロゴ"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p
            className="mt-3 text-center font-bold tracking-widest"
            style={{ color: "#3B3C3E", fontSize: "clamp(12px, 4vw, 20px)", letterSpacing: "0.1em" }}
          >
            KANDA Startup Commons
          </p>
        </div>
      </section>

      {/* KSCとはセクション */}
      <section id="about" style={{ backgroundColor: "#E3E0DA" }}>
        <div className="pt-0 pb-8 md:pt-16 md:pb-16 max-w-[1440px] mx-auto px-6 lg:px-[117px]">
        <RevealSection>
          <h2 className="h2-banner">KANDA Startup Commons とは</h2>
          <h3 className="no-marker mt-4" style={{ color: "#3B3C3E" }}>社会課題から、次世代の豊かさへ</h3>
        </RevealSection>
        <div className="grid grid-cols-1 gap-16 items-start">
          <RevealSection className="space-y-6 leading-relaxed text-left" style={{ color: "#3B3C3E" }}>
            <p>
              KANDA Startup Commons(通称&quot;神スタ&quot;)が応援したいのは、一人ひとりから湧き上がる想いや社会課題の解決を出発点にしながら、その先にある次世代の豊かさを生み出そうとする挑戦です。
            </p>
            <p>
              「できなかったことを、できるようにする」だけでなく、「<span style={{ color: "#D94C0B" }}>すでにある価値を、もっと面白く、もっと豊かにする</span>」。その両方に向き合い、事業として継続していく意志と可能性を持つ挑戦を、私たちは大切にしています。
            </p>
            <p>
              社会性と事業性、理想と現実のあいだを行き来しながら、試し、学び、前に進もうとする人たちが集まる場を、神田からつくっていきます。
            </p>
          </RevealSection>
        </div>
        </div>
      </section>

      {/* 役割を持って持ち寄るセクション */}
      <section style={{ backgroundColor: "#EBE8E2" }}>
        <div className="pt-8 pb-8 md:py-16 max-w-[1440px] mx-auto px-6 lg:px-[117px]">
          <RevealSection delay="reveal-delay-2" className="space-y-6 leading-relaxed">
            <h3 className="no-marker">役割を持って関わる</h3>
            <p>
              KANDA Startup Commonsは、参画する一人ひとりが、<span style={{ color: "#D94C0B" }}>自分なりの役割を持って関わることを</span>大切にしています。
            </p>

            <p>
              持ち寄ることで一人ではできなかったことが、少しずつ動き出す。それぞれができることを少しずつ出し合えば、もっと大きな挑戦ができる。
            </p>
            <p>
              支援する・される、民間・行政、住む人・働く人。そうした垣根をこえて、一人ひとりのゆるやかな参加を通じて、共に創り上げていく。
            </p>
            <p>
              このまちに、そんな豊かな「<span style={{ color: "#D94C0B" }}>共（Commons）</span>」の土壌を育んでいきたいと、私たちは考えています。
            </p>
          </RevealSection>
        </div>
      </section>

      {/* 役割セクション */}
      <section id="roles" style={{ backgroundColor: "#E3E0DA" }}>
        <div className="pt-0 pb-24 md:py-16 max-w-[1440px] mx-auto px-6 lg:px-[117px]">
          {/* こんな人たちを募集しています */}
          <div>
            <RevealSection>
              <h2 className="h2-banner">こんな人たちを募集しています</h2>
            </RevealSection>
          </div>

          <div style={{ height: "40px" }} />

          {/* 挑戦者 */}
          <div className="mb-20">
            <RevealSection>
              <h3>挑戦者</h3>
            </RevealSection>
            <RevealSection className="space-y-4 leading-relaxed mb-8" style={{ color: "#3B3C3E" }}>
              <p>
                スタートアップの立ち上げ、<br className="md:hidden" />
                新規事業、社会課題への挑戦。<br />
                まだ途中で、<br className="md:hidden" />
                答えが見えていなくても構いません。<br className="md:hidden" />
                未完成なアイデアや問いが大歓迎です。
              </p>
            </RevealSection>

            {/* 挑戦者カード PC用（md以上） */}
            <RevealSection>
              <div
                className="relative w-[96%] mx-auto rounded-sm overflow-hidden hidden lg:flex flex-row items-stretch justify-start pl-[3%]"
                style={{ border: "2px solid #001597", minHeight: "clamp(120px, 15vw, 220px)", backgroundColor: "#ffffff" }}
              >
                {/* 左：画像エリア */}
                <div className="relative shrink-0" style={{ width: "32%", minHeight: "clamp(120px, 15vw, 220px)" }}>
                  <div className="absolute inset-0">
                    <Image src="/images/common/challenger-mobile.png" alt="挑戦者" fill className="object-contain object-center" />
                  </div>
                </div>
                {/* 右：テキストエリア */}
                <div className="flex flex-col justify-center px-4 py-6 flex-1">
                  <p className="leading-relaxed text-sm" style={{ color: "#C79500", lineHeight: "1.8" }}>
                    自ら旗を掲げて起業し、情熱をもって事業を推進するチャレンジャー。KANDA Startup Commonsの主役であり、自らの意思で世界を変えようと挑み続ける、熱い起業家たちです。
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* 挑戦者カード スマホ用（md未満） */}
            <div className="lg:hidden w-[90%] mx-auto">
              <MemberCardMobile
                imageSrc="/images/common/challenger-mobile.png"
                alt="挑戦者"
                borderColor="#001597"
              >
                <p className="leading-relaxed text-[13px]" style={{ fontSize: "13px", lineHeight: "1.8", color: "#C79500", wordBreak: "keep-all", overflowWrap: "anywhere" }}>
                  自ら旗を掲げて起業し、情熱をもって事業を推進するチャレンジャー。KANDA Startup Commonsの主役であり、自らの意思で世界を変えようと挑み続ける、熱い起業家たちです。
                </p>
              </MemberCardMobile>            </div>
          </div>

          {/* サポート会員 */}
          <div className="space-y-8">
            <RevealSection>
              <h3>サポート会員</h3>
            </RevealSection>

            {/* 応援団：テキスト左・画像右 */}
            <div>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto hidden lg:flex flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", minHeight: "clamp(120px, 15vw, 220px)", backgroundColor: "#ffffff" }}
                >
                  {/* 左：テキスト */}
                  <div className="flex flex-col justify-center px-4 py-6 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm" style={{ lineHeight: "1.8" }}>
                      <span style={{ color: "#D94C0B" }}>資金・人材面などでのバックアップ</span>をいただきながら、KANDA Startup Commons運営のコアメンバーとして活動していただく方たち。単なる支援にとどまらず、<span style={{ color: "#D94C0B" }}>運営サイドとして</span>スタートアップ支援及びCommons(共有地)の仕組みをデザインし、次世代のイノベーションを支えていきます。
                    </p>
                  </div>
                  {/* 右：画像エリア */}
                  <div className="relative shrink-0" style={{ width: "32%", minHeight: "clamp(120px, 15vw, 220px)" }}>
                    <div className="absolute inset-0">
                      <Image src="/images/common/ouenndann-mobile.png" alt="応援団" fill className="object-contain object-center" />
                    </div>
                  </div>
                </div>
              </RevealSection>
              {/* 応援団 スマホ用 */}
              <div className="lg:hidden w-[90%] mx-auto">
                <MemberCardMobile
                  imageSrc="/images/common/ouenndann-mobile.png"
                  alt="応援団"
                  borderColor="#C79500"
                  buttonColor="#3B3C3E"
                >
                  <p className="leading-relaxed text-[13px]" style={{ color: "#3B3C3E", fontSize: "13px", lineHeight: "1.8", wordBreak: "keep-all", overflowWrap: "anywhere" }}>
                    <span style={{ color: "#D94C0B" }}>資金・人材面などでのバックアップ</span>をいただきながら、KANDA Startup Commons運営のコアメンバーとして活動していただく方たち。単なる支援にとどまらず、<span style={{ color: "#D94C0B" }}>運営サイドとして</span>スタートアップ支援及びCommons(共有地)の仕組みをデザインし、次世代のイノベーションを支えていきます。
                  </p>
                </MemberCardMobile>
              </div>
            </div>

            {/* 盛り上げ隊：画像左・テキスト右 */}
            <div>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto hidden lg:flex flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", minHeight: "clamp(120px, 15vw, 220px)", backgroundColor: "#ffffff" }}
                >
                  {/* 左：画像エリア */}
                  <div className="relative shrink-0" style={{ width: "32%", minHeight: "clamp(120px, 15vw, 220px)" }}>
                    <div className="absolute inset-0">
                      <Image src="/images/common/moriagetai-mobile.png" alt="盛り上げ隊" fill className="object-contain object-center" />
                    </div>
                  </div>
                  {/* 右：テキスト */}
                  <div className="flex flex-col justify-center px-4 py-4 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm" style={{ lineHeight: "1.8" }}>
                      登壇者となる方の紹介や対外的な宣伝など、<span style={{ color: "#D94C0B" }}>コミュニティの熱量を最大化</span>させる方たち。<br />
                      「KANDA Startup Commonsを紹介したい！」<br />
                      「この挑戦と持ち寄りの輪をもっと広げていきたい！」<br />
                      という情熱を持ち、<span style={{ color: "#D94C0B" }}>人と人をつなぐ懸け橋として</span>イベント活性化にご尽力いただいております。
                    </p>
                  </div>
                </div>
              </RevealSection>
              {/* 盛り上げ隊 スマホ用 */}
              <div className="lg:hidden w-[90%] mx-auto">
                <MemberCardMobile
                  imageSrc="/images/common/moriagetai-mobile.png"
                  alt="盛り上げ隊"
                  borderColor="#C79500"
                  buttonColor="#3B3C3E"
                >
                  <p className="leading-relaxed text-[13px]" style={{ color: "#3B3C3E", fontSize: "13px", lineHeight: "1.8", wordBreak: "keep-all", overflowWrap: "anywhere" }}>
                    登壇者となる方の紹介や対外的な宣伝など、<span style={{ color: "#D94C0B" }}>コミュニティの熱量を最大化</span>させる方たち。<br />
                    「KANDA Startup Commonsを紹介したい！」<br />
                    「この挑戦と持ち寄りの輪をもっと広げていきたい！」<br />
                    という情熱を持ち、<span style={{ color: "#D94C0B" }}>人と人をつなぐ懸け橋として</span>イベント活性化にご尽力いただいております。
                  </p>
                </MemberCardMobile>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 過去のイベント実績セクション */}
      <section id="openday" style={{ backgroundColor: "#EBE8E2" }}>
        <div className="pt-8 pb-8 md:py-16 md:pb-16 max-w-[1440px] mx-auto px-6 lg:px-[117px]">
        <RevealSection>
          <h2 className="h2-banner">イベントの様子</h2>
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
            className="inline-block px-10 py-4 text-base hover:opacity-70 transition-opacity"
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
        </div>
      </section>

      {/* 運営主体セクション */}
      <section style={{ backgroundColor: "#E3E0DA" }}>
        <div className="pt-0 pb-8 md:pt-16 md:pb-16 max-w-[1440px] mx-auto px-6 lg:px-[117px]">
          <RevealSection>
            <h2 className="h2-banner">運営主体</h2>
          </RevealSection>

          <RevealSection className="space-y-6 leading-relaxed text-left" style={{ color: "#3B3C3E" }}>
            <p>KANDA Startup Commonsは主に以下3社が主体として実行委員会を運営しています。</p>

            <div>
              <h3>
                <a href="https://novolba.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  株式会社NovolBa
                </a>
              </h3>
              <p>
                株式会社NovolBa(昇る場）は、「挑戦者が輝く世界を創る」をミッションに、スタートアップが働きやすい場として家具サブスクや家具付きオフィスのサブスクを提供しています。また、スタートアップを様々な関係者と繋げるメディア運営、コミュニティ活動もしています。
              </p>
            </div>

            <div>
              <h3>
                <a href="https://www.yamori.jp/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  プラットフォームサービス株式会社
                </a>
              </h3>
              <p>
                「ちよだプラットフォームスクウェア」は、様々な世代と地域が共創しながら新たなビジネスや文化を生み出していくための拠点施設です。
              </p>
            </div>

            <div>
              <h3>
                <a href="https://sworkers.jp/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  株式会社Sworkers
                </a>
              </h3>
              <p>
                「スタートアップに挑む人を、ふやす」をビジョンに掲げ、スタートアップ・成長企業と挑戦する個人をつなぐ人材支援・女性起業家支援プログラムの提供。女性向けキャリアカンファレンスの運営を行っています。
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 参画パートナーセクション */}
      <section style={{ backgroundColor: "#E3E0DA" }}>
        <div className="pt-0 pb-8 md:pt-16 md:pb-16 max-w-[1440px] mx-auto px-6 lg:px-[117px]">
          <RevealSection>
            <h2 className="h2-banner">参画パートナー</h2>
          </RevealSection>

          <RevealSection className="space-y-6 leading-relaxed text-left" style={{ color: "#3B3C3E" }}>
            <div>
              <h3>応援団</h3>
              <p>・安田不動産株式会社</p>
              <p>・株式会社三菱UFJ銀行</p>
              <p>・株式会社髙木ビル</p>
            </div>

            <div>
              <h3>盛り上げ隊</h3>
              <p>・田中英和 株式会社A+plus</p>
              <p>・株式会社YOUTRUST</p>
              <p>・平野雅丈 エイプラス</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" style={{ backgroundColor: "#E3E0DA" }}>
        <div className="pt-4 pb-24 md:py-16 px-8 max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="h2-banner">お問い合わせ</h2>
          </RevealSection>
          <RevealSection>
            <p>皆様からのご連絡をお待ちしております</p>
          </RevealSection>
          <RevealSection>
            <ContactForm />
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
