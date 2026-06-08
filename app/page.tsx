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
      {/* ヒ�Eローセクション */}
      <section
        className="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ minHeight: "clamp(300px, 50vw, 640px)" }}
      >
        {/* 背景画僁E*/}
        <Image
          src="/images/hero/hero1.png"
          alt="KANDA Startup Commons ヒ�Eロー背景"
          fill
          className="object-cover object-center"
          priority
        />
        {/* オーバ�Eレイ�E�文字を読みめE��くするため薄ぁE���E�E*/}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.45)" }} />

        {/* コンチE��チE��前面�E�E*/}
        <div className="relative z-10 flex flex-col items-center pt-12 sm:pt-0">
          {/* ロゴ画僁E*/}
          <div className="relative" style={{ width: "clamp(160px, 28vw, 340px)", height: "clamp(160px, 28vw, 340px)" }}>
            <Image
              src="/images/events/ksc_logo_縁あめE(1).png"
              alt="KANDA Startup Commons ロゴ"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* サイト名チE��スチE*/}
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
      <section id="about" className="pt-0 pb-24 md:py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2 className="h2-banner">KANDA<br className="md:hidden" />Startup<br className="md:hidden" />Commons とは</h2>
          <h3 className="no-marker" style={{ color: "#3B3C3E" }}>社会課題から、Ebr className="md:hidden" />次世代の豊かさへ</h3>
        </RevealSection>
        <div style={{ height: "1.5em" }} />
        <div className="grid grid-cols-1 gap-16 items-start">
          <RevealSection className="space-y-6 leading-relaxed text-left" style={{ color: "#3B3C3E" }}>
            <p>
              KANDA Startup Commons(通称"神スタ")ぁEbr className="md:hidden" />
              応援したぁE�Eは、Ebr />
              一人ひとりから湧き上がる想ぁE��<br className="md:hidden" />
              社会課題�E解決を�E発点にしながら、Ebr />
              そ�E先にある次世代の豊かさを<br className="md:hidden" />
              生み出そうとする挑戦です、E
            </p>
            <p>
              「できなかったことを、できるようにする、Ebr className="md:hidden" />
              だけでなく、Ebr />
              、Espan style={{ color: "#D94C0B" }}>すでにある価値を、もっと面白く、Ebr className="md:hidden" />もっと豊かにする</span>」、Ebr />
              そ�E両方に向き合い、Ebr className="md:hidden" />
              事業として継続してぁE��意志と<br className="md:hidden" />
              可能性を持つ挑戦を、Ebr className="md:hidden" />
              私たちは大刁E��してぁE��す、E
            </p>
            <p>
              社会性と事業性、Ebr className="md:hidden" />
              琁E��と現実�Eあいだを行き来しながら、Ebr />
              <span style={{ color: "#D94C0B" }}>試し、学び、前に進もうとする人たちぁEbr className="md:hidden" />雁E��る場を、神田から</span>つくってぁE��ます、E
            </p>
          </RevealSection>
        </div>
      </section>

      {/* 役割を持って持ち寁E��セクション */}
      <section className="py-24 px-8 max-w-7xl mx-auto" style={{ backgroundColor: "#D6D3CD" }}>
          <RevealSection delay="reveal-delay-2" className="space-y-6 leading-relaxed">
            <h3 className="no-marker">役割を持って関わる</h3>
            <p>
              KANDA Startup Commonsは、Ebr className="md:hidden" />
              参画する一人ひとりが、Ebr className="md:hidden" />
              <span style={{ color: "#D94C0B" }}>自刁E��り�E役割を持って関わることめE/span><br className="md:hidden" />
              <span style={{ color: "#D94C0B" }}>大刁E��してぁE��す、E/span>
            </p>

            {/* 画僁EW:311 H:624�E�スマ�Eのみ�E�E*/}
            <div className="md:hidden relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "311/624" }}>
              <Image
                src="/images/events/fixedinsert.png"
                alt="役割を持って関わる"
                fill
                className="object-cover"
              />
            </div>

            <p>
              持ち寁E��ことで<br className="md:hidden" />
              一人ではできなかったことが、Ebr className="md:hidden" />
              少しずつ動き出す、Ebr />
              それぞれができることめEbr className="md:hidden" />
              少しずつ出し合え�E、Ebr className="md:hidden" />
              もっと大きな挑戦ができる、E
            </p>
            <p>
              支援する・される、民間・行政、Ebr className="md:hidden" />
              住�E人・働く人、Ebr className="md:hidden" />
              そうした垣根をこえて、Ebr />
              一人ひとり�EめE��めE��な参加を通じて、Ebr className="md:hidden" />
              共に創り上げてぁE��、E
            </p>
            <p>
              こ�Eまちに、Ebr className="md:hidden" />
              そんな豊かな、Espan style={{ color: "#C79500" }}>共�E�Eommons�E�E/span>」�E<br className="md:hidden" />
              土壌を育んでぁE��たいと、Ebr className="md:hidden" />
              私たちは老E��てぁE��す、E
            </p>
          </RevealSection>
      </section>

      {/* 役割セクション */}
      <section id="roles" className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[117px]">
          <RevealSection>
            <h3 className="no-marker">こんな人たちを募雁E��てぁE��ぁE/h3>
          </RevealSection>

          {/* 挑戦老E*/}
          <div className="mb-20">
            <RevealSection>
              <h3>挑戦老E/h3>
            </RevealSection>
            <RevealSection className="space-y-4 leading-relaxed mb-8" style={{ color: "#3B3C3E" }}>
              <p style={{ fontSize: "14px" }}>
                スタートアチE�Eの立ち上げ、Ebr className="md:hidden" />
                新規事業、社会課題への挑戦、Ebr />
                まだ途中で、Ebr className="md:hidden" />
                答えが見えてぁE��くても構いません、Ebr className="md:hidden" />
                未完�EなアイチE��めE��ぁE��大歓迎です、E
              </p>
            </RevealSection>

            {/* 挑戦老E��ーチEPC用�E�Ed以上！E*/}
            <RevealSection>
              <div
                className="relative w-[96%] mx-auto rounded-sm overflow-visible hidden md:flex flex-row items-stretch justify-start pl-[3%]"
                style={{ border: "2px solid #001597", aspectRatio: "1083/240", maxHeight: "240px", backgroundColor: "#ffffff" }}
              >
                {/* 左�E�画像エリア�E�Ehallenger-nameとchallenger-1の重�E�E�E*/}
                <div className="relative shrink-0" style={{ width: "32%" }}>
                  {/* challenger-name.png�E�縦チE��スト裁E���E�E 背面 */}
                  <div className="absolute z-0" style={{ left: "2%", top: "50%", transform: "translateY(-50%)", width: "22%", aspectRatio: "92/241" }}>
                    <Image src="/images/common/challenger-name.png" alt="challenger" fill className="object-contain object-bottom" />
                  </div>
                  {/* challenger-1.png�E�メイン画像！E 前面 */}
                  <div className="absolute z-10" style={{ left: "22%", bottom: 0, width: "85%", aspectRatio: "413/395" }}>
                    <Image src="/images/common/challenger-1.png" alt="挑戦老E fill className="object-contain object-bottom" />
                  </div>
                </div>
                {/* 右�E�テキストエリア */}
                <div className="flex flex-col justify-center px-4 py-4" style={{ width: "40%" }}>
                  <p className="leading-relaxed text-sm" style={{ color: "#C79500" }}>
                    自ら旗を掲げて起業し、Ebr />
                    惁E�Eをもって事業を推進するチャレンジャー、Ebr />
                    KANDA Startup Commonsの主役であり、Ebr />
                    自ら�E意思で世界を変えようと挑み続ける、Ebr />
                    熱ぁE��業家たちです、E
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* 挑戦老E��ーチEスマ�E用�E�Ed未満�E�E*/}
            <div className="md:hidden">
              <MemberCardMobile
                imageSrc="/images/common/challenger-1.png"
                nameSrc="/images/common/challenger-name.png"
                alt="挑戦老E
                borderColor="#001597"
              >
                <p className="leading-relaxed text-[11px]">
                  自ら旗を掲げて起業し、情熱をもって<br />
                  事業を推進するチャレンジャー、Ebr />
                  KANDA Startup Commonsの主役であり、Ebr />
                  自ら�E意思で世界を変えようと挑み続ける、Ebr />
                  熱ぁE��業家たちです、E
                </p>
              </MemberCardMobile>            </div>
          </div>

          {/* サポ�Eト会員 */}
          <div className="space-y-8">
            <RevealSection>
              <h3>サポ�Eト会員</h3>
            </RevealSection>

            {/* 応援団�E�テキスト左・画像右 */}
            <div>
              <RevealSection>
                <h3 className="no-marker">応援団</h3>
              </RevealSection>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto hidden md:flex flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", aspectRatio: "1083/240", maxHeight: "240px", backgroundColor: "#ffffff" }}
                >
                  {/* 左�E�テキスチE*/}
                  <div className="flex flex-col justify-center px-4 py-4 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm">
                      <span style={{ color: "#D94C0B" }}>賁E��・人材面などでのバックアチE�E</span>をいただきながら、Ebr />
                      KANDA Startup Commons運営のコアメンバ�Eとして活動してぁE��だく方たち、Ebr />
                      単なる支援にとどまらず、Espan style={{ color: "#D94C0B" }}>運営サイドとして</span>スタートアチE�E支援及�ECommons(共有地)の<br />
                      仕絁E��をデザインし、次世代のイノ�Eーションを支えてぁE��ます、E
                    </p>
                  </div>
                  {/* 右�E�画像エリア */}
                  <div className="relative shrink-0" style={{ width: "32%" }}>
                    {/* ouenndann-name.png - 背面 */}
                    <div className="absolute z-0" style={{ right: "76%", top: "50%", transform: "translateY(-50%)", width: "22%", aspectRatio: "92/241" }}>
                      <Image src="/images/common/ouenndann-name.png" alt="応援団" fill className="object-contain" />
                    </div>
                    {/* ouenndann.png - 前面 */}
                    <div className="absolute z-10" style={{ right: "8%", bottom: 0, width: "72%", aspectRatio: "304/385" }}>
                      <Image src="/images/common/ouenndann.png" alt="応援団" fill className="object-contain object-bottom" />
                    </div>
                  </div>
                </div>
              </RevealSection>
              {/* 応援団 スマ�E用 */}
              <div className="md:hidden">
                <MemberCardMobile
                  imageSrc="/images/common/ouenndann-mobile.png"
                  alt="応援団"
                  borderColor="#C79500"
                  buttonColor="#C79500"
                >
                  <p className="leading-relaxed text-[11px]" style={{ color: "#3B3C3E" }}>
                    <span style={{ color: "#D94C0B" }}>賁E��・人材面などでのバックアチE�EめE/span><br />
                    <span style={{ color: "#D94C0B" }}>ぁE��だきながら、E/span>KANDA Startup Commons運営の<br />
                    コアメンバ�Eとして活動してぁE��だく方たち、Ebr />
                    単なる支援にとどまらず、Espan style={{ color: "#D94C0B" }}>運営サイドとして</span><br />
                    スタートアチE�E支援及�ECommons(共有地)の<br />
                    仕絁E��をデザインし、Ebr />
                    次世代のイノ�Eーションを支えてぁE��ます、E
                  </p>
                </MemberCardMobile>
              </div>
            </div>

            {/* 盛り上げ隊：画像左・チE��スト右 */}
            <div>
              <RevealSection>
                <h3 className="no-marker">盛り上げ隁E/h3>
              </RevealSection>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto hidden md:flex flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", aspectRatio: "1083/240", maxHeight: "240px", backgroundColor: "#ffffff" }}
                >
                  {/* 左�E�画像エリア */}
                  <div className="relative shrink-0" style={{ width: "32%" }}>
                    {/* moriagetai-name.png */}
                    <div className="absolute" style={{ left: "4%", top: "50%", transform: "translateY(-50%)", width: "22%", aspectRatio: "92/241" }}>
                      <Image src="/images/common/moriagetai-name.png" alt="盛り上げ隁E fill className="object-contain" />
                    </div>
                    {/* moriagetai.png */}
                    <div className="absolute" style={{ left: "20%", bottom: 0, width: "75%", aspectRatio: "383/357" }}>
                      <Image src="/images/common/moriagetai.png" alt="盛り上げ隁E fill className="object-contain object-bottom" />
                    </div>
                  </div>
                  {/* 右�E�テキスチE*/}
                  <div className="flex flex-col justify-center px-4 py-4 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm">
                      登壁E��E��なる方の紹介や対外的な宣伝など、Espan style={{ color: "#D94C0B" }}>コミュニティの熱量を最大匁E/span>させる方たち、Ebr />
                      「KANDA Startup Commonsを紹介したい�E�、Ebr />
                      「この挑戦と持ち寁E��の輪をもっと庁E��てぁE��たい�E�、Ebr />
                      とぁE��惁E�Eを持ち、Espan style={{ color: "#D94C0B" }}>人と人をつなぐ�Eけ橋として</span>イベント活性化にご尽力いただぁE��おります、E
                    </p>
                  </div>
                </div>
              </RevealSection>
              {/* 盛り上げ隁Eスマ�E用 */}
              <div className="md:hidden">
                <MemberCardMobile
                  imageSrc="/images/common/moriagetai-mobile.png"
                  alt="盛り上げ隁E
                  borderColor="#C79500"
                  buttonColor="#C79500"
                >
                  <p className="leading-relaxed text-[11px]" style={{ color: "#3B3C3E" }}>
                    登壁E��E��なる方の紹介や対外的な宣伝など、Ebr />
                    <span style={{ color: "#D94C0B" }}>コミュニティの熱量を最大匁E/span>させる方たち、Ebr />
                    「KANDA Startup Commonsを紹介したい�E�、Ebr />
                    「この挑戦と持ち寁E��の輪めEbr />
                    もっと庁E��てぁE��たい�E�、Ebr />
                    とぁE��惁E�Eを持ち、Espan style={{ color: "#D94C0B" }}>人と人をつなぐ�Eけ橋として</span><br />
                    イベント活性化にご尽力いただぁE��おります、E
                  </p>
                </MemberCardMobile>
              </div>
            </div>

            {/* 助っ人団�E�テキスト左・画像右 */}
            <div>
              <RevealSection>
                <h3 className="no-marker">助っ人団</h3>
              </RevealSection>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto hidden md:flex flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", aspectRatio: "1083/240", maxHeight: "240px", backgroundColor: "#ffffff" }}
                >
                  {/* 左�E�テキスチE*/}
                  <div className="flex flex-col justify-center px-4 py-4 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm">
                      自ら�E持つスキルめE�Eロダクト、アセチE��などでコミュニティ運営を支えてぁE��だく方たち、Ebr />
                      プロダクト、コンチE��チE��提供し、Espan style={{ color: "#D94C0B" }}>裏�Eから強く支えるパ�Eトナー、E/span><br />
                      あなた�EチE��ノロジー・プロダクトが、KANDA Startup Commonsの冁E��な運営を支えます、E
                    </p>
                  </div>
                  {/* 右�E�画像エリア */}
                  <div className="relative shrink-0" style={{ width: "30%" }}>
                    {/* suketto.png */}
                    <div className="absolute" style={{ right: "8%", bottom: 0, width: "47%", aspectRatio: "210/404", transform: "scaleX(-1)" }}>
                      <Image src="/images/common/suketto.png" alt="助っ人団" fill className="object-contain object-bottom" />
                    </div>
                    {/* suketto-name.png */}
                    <div className="absolute" style={{ right: "68%", top: "50%", transform: "translateY(-50%)", width: "22%", aspectRatio: "92/241" }}>
                      <Image src="/images/common/suketto-name.png" alt="助っ人団" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </RevealSection>
              {/* 助っ人団 スマ�E用 */}
              <div className="md:hidden">
                <MemberCardMobile
                  imageSrc="/images/common/suketto-mobile.png"
                  alt="助っ人団"
                  borderColor="#C79500"
                  buttonColor="#C79500"
                >
                  <p className="leading-relaxed text-[11px]" style={{ color: "#3B3C3E" }}>
                    自ら�E持つスキルめE�Eロダクト、アセチE��などで<br />
                    コミュニティ運営を支えてぁE��だく方たち、Ebr />
                    プロダクト、コンチE��チE��提供し、Ebr />
                    <span style={{ color: "#D94C0B" }}>裏�Eから強く支えるパ�Eトナー、E/span><br />
                    あなた�EチE��ノロジー・プロダクトが、Ebr />
                    KANDA Startup Commonsの<br />
                    冁E��な運営を支えます、E
                  </p>
                </MemberCardMobile>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 過去のイベント実績セクション */}
      <section id="openday" className="py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2 style={{ color: "#3B3C3E" }}>過去のイベンチE/h2>
          <p>
            多様なプレイヤーが気軽に雁E��、交流できる場として神田町でのイベントを定期皁E��開催してぁE��す、E
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
            最新のイベント情報を確認すめE
          </a>
        </RevealSection>

        {/* 記事カーチE*/}
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
                title="【イベントレポ�Eト】「KANDA Open Day@神田錦町」第2回を開催しました�E�E
                date="2026.04.15"
                external
              />
              <ArticleCard
                href="https://novolba.com/media/event260303/"
                img="/images/events/rightside.png"
                title="【イベントレポ�Eト】「KANDA Open Day@神田錦町」第1回を開催しました�E�E
                date="2026.03.03"
                delay="reveal-delay-2"
                external
              />
            </>
          )}
        </div>

        {/* もっとみる�Eタン�E�封E��皁E��復活予定！E
        <RevealSection className="text-center">
          <a
            href="#"
            className="inline-block px-8 py-3 border text-sm hover:opacity-70 transition-opacity"
            style={{ borderColor: "#3B3C3E", color: "#3B3C3E", borderRadius: "9999px" }}
          >
            もっとみめE
          </a>
        </RevealSection>
        */}
      </section>

      {/* お問ぁE��わせセクション */}
      <section id="contact" className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2>お問ぁE��わせ</h2>
          </RevealSection>
          <RevealSection>
            <ContactForm />
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
