"use client";

import { useState } from "react";
import Image from "next/image";

const members = [
  {
    role: "挑戦者",
    label: "◾︎ スタートアップ会員",
    desc: (
      <>
        スタートアップの立ち上げ、新規事業、社会課題への挑戦。<br />
        まだ途中で、答えが見えていなくても構いません。<br />
        未完成なアイデアや問いが大歓迎です。<br /><br />
        一人で抱え込まず、「何をやりたいか」「何に困っているか」を言葉にして、<br />
        参加してみてください。
      </>
    ),
  },
  {
    role: "応援団",
    label: "◾︎ 応援団",
    desc: (
      <>
        資金・人材面などでのバックアップをいただきながら、<br />
        KANDA Startup Commons運営のコアメンバーとして活動していただく方たち。<br />
        単なる支援にとどまらず、運営サイドとしてスタートアップ支援及びCommons(共有地)の仕組みを<br />
        デザインし、次世代のイノベーションを支えていきます。
      </>
    ),
  },
  {
    role: "盛り上げ隊",
    label: "◾︎ 盛り上げ隊",
    desc: (
      <>
        イベントPRや登壇者となる方の紹介や対外的な宣伝など、<br />
        人と人の懸け橋としてコミュニティの熱量を最大化させる方たち。<br />
        「KANDA Startup Commonsを紹介したい！」<br />
        「この挑戦と持ち寄りの輪をもっと広げていきたい！」<br />
        という情熱を持ち、人と人をつなぐ懸け橋としてイベント活性化に<br />
        ご尽力いただいております。
      </>
    ),
  },
  {
    role: "助っ人団",
    label: "◾︎ 助っ人団（盛り上げ隊）",
    desc: (
      <>
        自らの持つスキルやプロダクト、アセットなどでコミュニティ運営を支えていただく方たち。<br />
        プロダクト、コンテンツを提供し、裏側から強く支えるパートナー。<br />
        あなたのテクノロジー・プロダクトが、KANDA Startup Commonsの円滑な運営を支えます。
      </>
    ),
  },
];

export default function SupportMemberCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = (index: number, dir: "left" | "right") => {
    if (animating || index === current) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 500);
  };

  const prev = () => {
    const index = (current - 1 + members.length) % members.length;
    goTo(index, "left");
  };

  const next = () => {
    const index = (current + 1) % members.length;
    goTo(index, "right");
  };

  const member = members[current];

  return (
    <div className="flex flex-col items-center">
      {/* スライドエリア */}
      <div className="w-full overflow-hidden">
        <div
          className="flex flex-col items-center text-center px-8"
          style={{
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "right" ? "-40px" : "40px"})`
              : "translateX(0)",
          }}
        >
          {/* 丸い画像 */}
          <div style={{ width: "192px", height: "192px", borderRadius: "50%", overflow: "hidden", marginBottom: "24px", flexShrink: 0, position: "relative" }}>
            <Image
              src="/images/events/challenger.png"
              alt={member.role}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>

          {/* ラベル */}
          <p className="text-sm mb-2" style={{ color: "#767676" }}>
            {member.label}
          </p>

          {/* 説明文 */}
          <p
            className="leading-relaxed max-w-xl text-sm"
            style={{ color: "#3B3C3E" }}
          >
            {member.desc}
          </p>
        </div>
      </div>

      {/* 左右矢印 */}
      <div className="flex items-center gap-12 mt-10">
        <button
          onClick={prev}
          className="w-10 h-10 flex items-center justify-center rounded-full border hover:opacity-60 transition-opacity"
          style={{ borderColor: "#3B3C3E", color: "#3B3C3E" }}
          aria-label="前へ"
        >
          ←
        </button>

        {/* ドットボタン */}
        <div className="flex items-center gap-3">
          {members.map((m, i) => (
            <button
              key={m.role}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className="flex flex-col items-center gap-1 group"
              aria-label={m.role}
            >
              <span
                className="text-xs transition-opacity"
                style={{
                  color: "#3B3C3E",
                  opacity: i === current ? 1 : 0.35,
                  fontWeight: i === current ? "600" : "400",
                }}
              >
                {m.role}
              </span>
              <span
                className="block rounded-full transition-all"
                style={{
                  width: i === current ? "10px" : "8px",
                  height: i === current ? "10px" : "8px",
                  backgroundColor: i === current ? "#3B3C3E" : "#A8A5A0",
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 flex items-center justify-center rounded-full border hover:opacity-60 transition-opacity"
          style={{ borderColor: "#3B3C3E", color: "#3B3C3E" }}
          aria-label="次へ"
        >
          →
        </button>
      </div>
    </div>
  );
}
