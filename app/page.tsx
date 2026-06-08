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
      {/* 繝偵・繝ｭ繝ｼ繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ */}
      <section
        className="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ minHeight: "clamp(300px, 50vw, 640px)" }}
      >
        {/* 閭梧勹逕ｻ蜒・*/}
        <Image
          src="/images/hero/hero1.png"
          alt="KANDA Startup Commons 繝偵・繝ｭ繝ｼ閭梧勹"
          fill
          className="object-cover object-center"
          priority
        />
        {/* 繧ｪ繝ｼ繝舌・繝ｬ繧､・域枚蟄励ｒ隱ｭ縺ｿ繧・☆縺上☆繧九◆繧∬埋縺・區・・*/}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.45)" }} />

        {/* 繧ｳ繝ｳ繝・Φ繝・ｼ亥燕髱｢・・*/}
        <div className="relative z-10 flex flex-col items-center pt-12 sm:pt-0">
          {/* 繝ｭ繧ｴ逕ｻ蜒・*/}
          <div className="relative" style={{ width: "clamp(160px, 28vw, 340px)", height: "clamp(160px, 28vw, 340px)" }}>
            <Image
              src="/images/events/ksc_logo_邵√≠繧・(1).png"
              alt="KANDA Startup Commons 繝ｭ繧ｴ"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* 繧ｵ繧､繝亥錐繝・く繧ｹ繝・*/}
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

      {/* KSC縺ｨ縺ｯ繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ */}
      <section id="about" className="py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2 style={{ color: "#3B3C3E" }}>KANDA Startup Commons 縺ｨ縺ｯ</h2>
          <h3 className="no-marker" style={{ color: "#3B3C3E" }}>遉ｾ莨夊ｪｲ鬘後°繧峨∵ｬ｡荳紋ｻ｣縺ｮ雎翫°縺輔∈</h3>
        </RevealSection>

        <div className="grid grid-cols-1 gap-16 items-start">
          <RevealSection className="space-y-6 leading-relaxed text-left" style={{ color: "#3B3C3E" }}>
            <p>
              KANDA Startup Commons縺悟ｿ懈抄縺励◆縺・・縺ｯ縲・br />
              荳莠ｺ縺ｲ縺ｨ繧翫°繧画ｹｧ縺堺ｸ翫′繧区Φ縺・ｄ遉ｾ莨夊ｪｲ鬘後・隗｣豎ｺ繧貞・逋ｺ轤ｹ縺ｫ縺励↑縺後ｉ縲・
              縺昴・蜈医↓縺ゅｋ谺｡荳紋ｻ｣縺ｮ雎翫°縺輔ｒ逕溘∩蜃ｺ縺昴≧縺ｨ縺吶ｋ謖第姶縺ｧ縺吶・
            </p>
            <p>
              縲後〒縺阪↑縺九▲縺溘％縺ｨ繧偵√〒縺阪ｋ繧医≧縺ｫ縺吶ｋ縲阪□縺代〒縺ｪ縺上・
              縲・span style={{ color: "#D94C0B" }}>縺吶〒縺ｫ縺ゅｋ萓｡蛟､繧偵√ｂ縺｣縺ｨ髱｢逋ｽ縺上√ｂ縺｣縺ｨ雎翫°縺ｫ縺吶ｋ</span>縲阪・br />
              縺昴・荳｡譁ｹ縺ｫ蜷代″蜷医＞縲∽ｺ区･ｭ縺ｨ縺励※邯咏ｶ壹＠縺ｦ縺・￥諢丞ｿ励→蜿ｯ閭ｽ諤ｧ繧呈戟縺､謖第姶繧偵∫ｧ√◆縺｡縺ｯ螟ｧ蛻・↓縺励※縺・∪縺吶・
            </p>
            <p>遉ｾ莨壽ｧ縺ｨ莠区･ｭ諤ｧ縲∫炊諠ｳ縺ｨ迴ｾ螳溘・縺ゅ＞縺繧定｡後″譚･縺励↑縺後ｉ縲・/p>
            <p>
              <span style={{ color: "#D94C0B" }}>隧ｦ縺励∝ｭｦ縺ｳ縲∝燕縺ｫ騾ｲ繧ゅ≧縺ｨ縺吶ｋ莠ｺ縺溘■縺碁寔縺ｾ繧句ｴ繧偵∫･樒伐縺九ｉ</span>縺､縺上▲縺ｦ縺・″縺ｾ縺吶・
            </p>
          </RevealSection>
        </div>
      </section>

      {/* 蠖ｹ蜑ｲ繧呈戟縺｣縺ｦ謖√■蟇・ｋ繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ */}
      <section className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-16 items-start">
          <RevealSection delay="reveal-delay-2" className="space-y-6 leading-relaxed">
            <h3 className="no-marker">蠖ｹ蜑ｲ繧呈戟縺｣縺ｦ謖√■蟇・ｋ</h3>
            <p>
              KANDA Startup Commons縺ｯ縲∝盾逕ｻ縺吶ｋ荳莠ｺ縺ｲ縺ｨ繧翫′縲・
              <span style={{ color: "#D94C0B" }}>閾ｪ蛻・↑繧翫・蠖ｹ蜑ｲ繧呈戟縺｣縺ｦ髢｢繧上ｋ</span>縺薙→繧貞､ｧ蛻・↓縺励※縺・∪縺吶・
            </p>

            {/* 逕ｻ蜒上・繝ｬ繝ｼ繧ｹ繝帙Ν繝繝ｼ W:1200 H:327 */}
            <div
              className="w-full rounded-2xl flex items-center justify-center"
              style={{ aspectRatio: "1200/327", backgroundColor: "#C8C5BF", color: "#767676" }}
            >
              <span>逕ｻ蜒・/span>
            </div>

            <p>
              謖√■蟇・ｋ縺薙→縺ｧ荳莠ｺ縺ｧ縺ｯ縺ｧ縺阪↑縺九▲縺溘％縺ｨ縺後∝ｰ代＠縺壹▽蜍輔″蜃ｺ縺吶・br />
              縺昴ｌ縺槭ｌ縺後〒縺阪ｋ縺薙→繧貞ｰ代＠縺壹▽蜃ｺ縺怜粋縺医・縲√ｂ縺｣縺ｨ螟ｧ縺阪↑謖第姶縺後〒縺阪ｋ縲・
            </p>
            <p>
              謾ｯ謠ｴ縺吶ｋ繝ｻ縺輔ｌ繧九∵ｰ鷹俣繝ｻ陦梧帆縲∽ｽ上・莠ｺ繝ｻ蜒阪￥莠ｺ縲ゅ◎縺・＠縺溷椒譬ｹ繧偵％縺医※縲・br />
              荳莠ｺ縺ｲ縺ｨ繧翫・繧・ｋ繧・°縺ｪ蜿ょ刈繧帝壹§縺ｦ縲∝・縺ｫ蜑ｵ繧贋ｸ翫￡縺ｦ縺・￥縲・
            </p>
            <p>
              縺薙・縺ｾ縺｡縺ｫ縲√◎繧薙↑雎翫°縺ｪ縲・span style={{ color: "#C79500" }}>蜈ｱ・・ommons・・/span>縲阪・蝨溷｣後ｒ閧ｲ繧薙〒縺・″縺溘＞縺ｨ縲∫ｧ√◆縺｡縺ｯ閠・∴縺ｦ縺・∪縺吶・
            </p>
          </RevealSection>
        </div>
        </div>
      </section>

      {/* 蠖ｹ蜑ｲ繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ */}
      <section id="roles" className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[117px]">
          <RevealSection>
            <h2>KANDA Startup Commons 蜀・・蠖ｹ蜑ｲ</h2>
          </RevealSection>

          <RevealSection>
            <h3 className="no-marker">縺薙ｓ縺ｪ莠ｺ縺溘■繧貞供髮・＠縺ｦ縺・∪縺・/h3>
          </RevealSection>

          {/* 謖第姶閠・*/}
          <div className="mb-20">
            <RevealSection>
              <h3>謖第姶閠・/h3>
            </RevealSection>
            <RevealSection className="space-y-4 leading-relaxed mb-8" style={{ color: "#3B3C3E" }}>
              <p>
                繧ｹ繧ｿ繝ｼ繝医い繝・・縺ｮ遶九■荳翫￡縲∵眠隕丈ｺ区･ｭ縲∫､ｾ莨夊ｪｲ鬘後∈縺ｮ謖第姶縲・br />
                縺ｾ縺騾比ｸｭ縺ｧ縲∫ｭ斐∴縺瑚ｦ九∴縺ｦ縺・↑縺上※繧よｧ九＞縺ｾ縺帙ｓ縲よ悴螳梧・縺ｪ繧｢繧､繝・い繧・撫縺・′螟ｧ豁楢ｿ弱〒縺吶・
              </p>
            </RevealSection>

            {/* 謖第姶閠・き繝ｼ繝・W:1083 H:315 豈皮紫 */}
            <RevealSection>
              <div
                className="relative w-[96%] mx-auto rounded-sm overflow-visible flex flex-col md:flex-row items-stretch"
                style={{ border: "2px solid #001597", aspectRatio: "1083/315", maxHeight: "315px", backgroundColor: "#ffffff" }}
              >
                {/* 蟾ｦ・夂判蜒上お繝ｪ繧｢・・hallenger-name縺ｨchallenger-1縺ｮ驥阪・・・*/}
                <div className="relative shrink-0" style={{ width: "32%" }}>
                  {/* challenger-1.png・医Γ繧､繝ｳ逕ｻ蜒擾ｼ・ 繝懊ャ繧ｯ繧ｹ縺九ｉ縺ｯ縺ｿ蜃ｺ縺励※荳翫↓ */}
                  <div className="absolute" style={{ left: "22%", bottom: 0, width: "75%", aspectRatio: "413/395" }}>
                    <Image src="/images/common/challenger-1.png" alt="謖第姶閠・ fill className="object-contain object-bottom" />
                  </div>
                  {/* challenger-name.png・育ｸｦ繝・く繧ｹ繝郁｣・｣ｾ・・/}
                  <div className="absolute" style={{ left: "4%", top: "50%", transform: "translateY(-50%)", width: "14%", aspectRatio: "92/241" }}>
                    <Image src="/images/common/challenger-name.png" alt="challenger" fill className="object-contain object-bottom" />
                  </div>
                </div>
                {/* 蜿ｳ・壹ユ繧ｭ繧ｹ繝医お繝ｪ繧｢ */}
                <div className="flex flex-col justify-center px-4 py-4 flex-1">
                  <p className="leading-relaxed text-sm" style={{ color: "#C79500" }}>
                    閾ｪ繧画覧繧呈軸縺偵※襍ｷ讌ｭ縺励∵ュ辭ｱ繧偵ｂ縺｣縺ｦ莠区･ｭ繧呈耳騾ｲ縺吶ｋ繝√Ε繝ｬ繝ｳ繧ｸ繝｣繝ｼ縲・br />
                    KANDA Startup Commons縺ｮ荳ｻ蠖ｹ縺ｧ縺ゅｊ縲・br />
                    閾ｪ繧峨・諢乗昴〒荳也阜繧貞､峨∴繧医≧縺ｨ謖代∩邯壹￠繧九∫・縺・ｵｷ讌ｭ螳ｶ縺溘■縺ｧ縺吶・
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* 繧ｵ繝昴・繝井ｼ壼藤 */}
          <div className="space-y-16">
            <RevealSection>
              <h3>繧ｵ繝昴・繝井ｼ壼藤</h3>
            </RevealSection>

            {/* 蠢懈抄蝗｣・壹ユ繧ｭ繧ｹ繝亥ｷｦ繝ｻ逕ｻ蜒丞承 */}
            <div>
              <RevealSection>
                <h3 className="no-marker">蠢懈抄蝗｣</h3>
              </RevealSection>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto flex flex-col md:flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", aspectRatio: "1083/315", maxHeight: "315px", backgroundColor: "#ffffff" }}
                >
                  {/* 蟾ｦ・壹ユ繧ｭ繧ｹ繝・*/}
                  <div className="flex flex-col justify-center px-4 py-4 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm">
                      <span style={{ color: "#D94C0B" }}>雉・≡繝ｻ莠ｺ譚宣擇縺ｪ縺ｩ縺ｧ縺ｮ繝舌ャ繧ｯ繧｢繝・・</span>繧偵＞縺溘□縺阪↑縺後ｉ縲・br />
                      KANDA Startup Commons驕句霧縺ｮ繧ｳ繧｢繝｡繝ｳ繝舌・縺ｨ縺励※豢ｻ蜍輔＠縺ｦ縺・◆縺縺乗婿縺溘■縲・br />
                      蜊倥↑繧区髪謠ｴ縺ｫ縺ｨ縺ｩ縺ｾ繧峨★縲・span style={{ color: "#D94C0B" }}>驕句霧繧ｵ繧､繝峨→縺励※</span>繧ｹ繧ｿ繝ｼ繝医い繝・・謾ｯ謠ｴ蜿翫・Commons(蜈ｱ譛牙慍)縺ｮ<br />
                      莉慕ｵ・∩繧偵ョ繧ｶ繧､繝ｳ縺励∵ｬ｡荳紋ｻ｣縺ｮ繧､繝弱・繝ｼ繧ｷ繝ｧ繝ｳ繧呈髪縺医※縺・″縺ｾ縺吶・
                    </p>
                  </div>
                  {/* 蜿ｳ・夂判蜒上お繝ｪ繧｢ */}
                  <div className="relative shrink-0" style={{ width: "32%" }}>
                    {/* ouenndann.png */}
                    <div className="absolute" style={{ right: "8%", bottom: 0, width: "72%", aspectRatio: "304/385" }}>
                      <Image src="/images/common/ouenndann.png" alt="蠢懈抄蝗｣" fill className="object-contain object-bottom" />
                    </div>
                    {/* ouenndann-name.png */}
                    <div className="absolute" style={{ right: "76%", top: "50%", transform: "translateY(-50%)", width: "22%", aspectRatio: "92/241" }}>
                      <Image src="/images/common/ouenndann-name.png" alt="蠢懈抄蝗｣" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* 逶帙ｊ荳翫￡髫奇ｼ夂判蜒丞ｷｦ繝ｻ繝・く繧ｹ繝亥承 */}
            <div>
              <RevealSection>
                <h3 className="no-marker">逶帙ｊ荳翫￡髫・/h3>
              </RevealSection>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto flex flex-col md:flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", aspectRatio: "1083/315", maxHeight: "315px", backgroundColor: "#ffffff" }}
                >
                  {/* 蟾ｦ・夂判蜒上お繝ｪ繧｢ */}
                  <div className="relative shrink-0" style={{ width: "32%" }}>
                    {/* moriagetai-name.png */}
                    <div className="absolute" style={{ left: "4%", top: "50%", transform: "translateY(-50%)", width: "14%", aspectRatio: "93/244" }}>
                      <Image src="/images/common/moriagetai-name.png" alt="逶帙ｊ荳翫￡髫・ fill className="object-contain" />
                    </div>
                    {/* moriagetai.png */}
                    <div className="absolute" style={{ left: "20%", bottom: 0, width: "75%", aspectRatio: "383/357" }}>
                      <Image src="/images/common/moriagetai.png" alt="逶帙ｊ荳翫￡髫・ fill className="object-contain object-bottom" />
                    </div>
                  </div>
                  {/* 蜿ｳ・壹ユ繧ｭ繧ｹ繝・*/}
                  <div className="flex flex-col justify-center px-4 py-4 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm">
                      逋ｻ螢・・→縺ｪ繧区婿縺ｮ邏ｹ莉九ｄ蟇ｾ螟也噪縺ｪ螳｣莨昴↑縺ｩ縲・span style={{ color: "#D94C0B" }}>繧ｳ繝溘Η繝九ユ繧｣縺ｮ辭ｱ驥上ｒ譛螟ｧ蛹・/span>縺輔○繧区婿縺溘■縲・br />
                      縲桑ANDA Startup Commons繧堤ｴｹ莉九＠縺溘＞・√・br />
                      縲後％縺ｮ謖第姶縺ｨ謖√■蟇・ｊ縺ｮ霈ｪ繧偵ｂ縺｣縺ｨ蠎・￡縺ｦ縺・″縺溘＞・√・br />
                      縺ｨ縺・≧諠・・繧呈戟縺｡縲・span style={{ color: "#D94C0B" }}>莠ｺ縺ｨ莠ｺ繧偵▽縺ｪ縺先・縺第ｩ九→縺励※</span>繧､繝吶Φ繝域ｴｻ諤ｧ蛹悶↓縺泌ｰｽ蜉帙＞縺溘□縺・※縺翫ｊ縺ｾ縺吶・
                    </p>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* 蜉ｩ縺｣莠ｺ蝗｣・壹ユ繧ｭ繧ｹ繝亥ｷｦ繝ｻ逕ｻ蜒丞承 */}
            <div>
              <RevealSection>
                <h3 className="no-marker">蜉ｩ縺｣莠ｺ蝗｣</h3>
              </RevealSection>
              <RevealSection>
                <div
                  className="relative w-[96%] mx-auto flex flex-col md:flex-row items-stretch overflow-visible"
                  style={{ border: "2px solid #C79500", aspectRatio: "1083/315", maxHeight: "315px", backgroundColor: "#ffffff" }}
                >
                  {/* 蟾ｦ・壹ユ繧ｭ繧ｹ繝・*/}
                  <div className="flex flex-col justify-center px-4 py-4 flex-1" style={{ color: "#3B3C3E" }}>
                    <p className="leading-relaxed text-sm">
                      閾ｪ繧峨・謖√▽繧ｹ繧ｭ繝ｫ繧・・繝ｭ繝繧ｯ繝医√い繧ｻ繝・ヨ縺ｪ縺ｩ縺ｧ繧ｳ繝溘Η繝九ユ繧｣驕句霧繧呈髪縺医※縺・◆縺縺乗婿縺溘■縲・br />
                      繝励Ο繝繧ｯ繝医√さ繝ｳ繝・Φ繝・ｒ謠蝉ｾ帙＠縲・span style={{ color: "#D94C0B" }}>陬丞・縺九ｉ蠑ｷ縺乗髪縺医ｋ繝代・繝医リ繝ｼ縲・/span><br />
                      縺ゅ↑縺溘・繝・け繝弱Ο繧ｸ繝ｼ繝ｻ繝励Ο繝繧ｯ繝医′縲゜ANDA Startup Commons縺ｮ蜀・ｻ代↑驕句霧繧呈髪縺医∪縺吶・
                    </p>
                  </div>
                  {/* 蜿ｳ・夂判蜒上お繝ｪ繧｢ */}
                  <div className="relative shrink-0" style={{ width: "30%" }}>
                    {/* suketto.png */}
                    <div className="absolute" style={{ right: "8%", bottom: 0, width: "47%", aspectRatio: "210/404", transform: "scaleX(-1)" }}>
                      <Image src="/images/common/suketto.png" alt="蜉ｩ縺｣莠ｺ蝗｣" fill className="object-contain object-bottom" />
                    </div>
                    {/* suketto-name.png */}
                    <div className="absolute" style={{ right: "68%", top: "50%", transform: "translateY(-50%)", width: "22%", aspectRatio: "91/239" }}>
                      <Image src="/images/common/suketto-name.png" alt="蜉ｩ縺｣莠ｺ蝗｣" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* 驕主悉縺ｮ繧､繝吶Φ繝亥ｮ溽ｸｾ繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ */}
      <section id="openday" className="py-24 px-8 max-w-7xl mx-auto">
        <RevealSection>
          <h2 style={{ color: "#3B3C3E" }}>驕主悉縺ｮ繧､繝吶Φ繝・/h2>
          <p>
            螟壽ｧ倥↑繝励Ξ繧､繝､繝ｼ縺梧ｰ苓ｻｽ縺ｫ髮・＞縲∽ｺ､豬√〒縺阪ｋ蝣ｴ縺ｨ縺励※逾樒伐逕ｺ縺ｧ縺ｮ繧､繝吶Φ繝医ｒ螳壽悄逧・↓髢句ぎ縺励※縺・∪縺吶・
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
            譛譁ｰ縺ｮ繧､繝吶Φ繝域ュ蝣ｱ繧堤｢ｺ隱阪☆繧・
          </a>
        </RevealSection>

        {/* 險倅ｺ九き繝ｼ繝・*/}
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
                title="縲舌う繝吶Φ繝医Ξ繝昴・繝医代桑ANDA Open Day@逾樒伐骭ｦ逕ｺ縲咲ｬｬ2蝗槭ｒ髢句ぎ縺励∪縺励◆・・
                date="2026.04.15"
                external
              />
              <ArticleCard
                href="https://novolba.com/media/event260303/"
                img="/images/events/rightside.png"
                title="縲舌う繝吶Φ繝医Ξ繝昴・繝医代桑ANDA Open Day@逾樒伐骭ｦ逕ｺ縲咲ｬｬ1蝗槭ｒ髢句ぎ縺励∪縺励◆・・
                date="2026.03.03"
                delay="reveal-delay-2"
                external
              />
            </>
          )}
        </div>

        {/* 繧ゅ▲縺ｨ縺ｿ繧九・繧ｿ繝ｳ・亥ｰ・擂逧・↓蠕ｩ豢ｻ莠亥ｮ夲ｼ・
        <RevealSection className="text-center">
          <a
            href="#"
            className="inline-block px-8 py-3 border text-sm hover:opacity-70 transition-opacity"
            style={{ borderColor: "#3B3C3E", color: "#3B3C3E", borderRadius: "9999px" }}
          >
            繧ゅ▲縺ｨ縺ｿ繧・
          </a>
        </RevealSection>
        */}
      </section>

      {/* 縺雁撫縺・粋繧上○繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ */}
      <section id="contact" className="py-24 px-8" style={{ backgroundColor: "#D6D3CD" }}>
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <h2>縺雁撫縺・粋繧上○</h2>
          </RevealSection>
          <RevealSection>
            <ContactForm />
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
