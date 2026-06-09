"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  imageSrc: string;
  nameSrc?: string;
  alt: string;
  children: React.ReactNode;
  borderColor?: string;
  buttonColor?: string;
  bgColor?: string;
};

export default function MemberCardMobile({
  imageSrc,
  nameSrc,
  alt,
  children,
  borderColor = "#001597",
  buttonColor,
  bgColor = "#D6D3CD",
}: Props) {
  const [open, setOpen] = useState(false);
  const btnColor = buttonColor ?? borderColor;

  return (
    <div className="w-[90%] mx-auto">

      {/* ① 四角エリア：overflow:hidden で画像の上はみ出しをクリップ */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px 8px 0 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* 画像エリア：上端より少し上から始めてクリップ */}
        <div
          className="relative w-full"
          style={{
            height: "clamp(200px, 65vw, 300px)",
            marginTop: "clamp(-24px, -8vw, -48px)",
          }}
        >
          {nameSrc && (
            <div
              className="absolute z-0"
              style={{ left: "8%", top: "20%", width: "18%", aspectRatio: "92/241" }}
            >
              <Image src={nameSrc} alt={alt} fill className="object-contain" />
            </div>
          )}
          <div
            className="absolute z-10"
            style={{
              left: nameSrc ? "20%" : "50%",
              transform: nameSrc ? "none" : "translateX(-50%)",
              bottom: 0,
              width: nameSrc ? "85%" : "90%",
              aspectRatio: "1/1",
            }}
          >
            <Image src={imageSrc} alt={alt} fill className="object-contain object-bottom" />
          </div>
        </div>
      </div>

      {/* ② 三角エリア（閉じている時のみ）：四角の直下に接続する下向き三角 */}
      {!open && (
        <div style={{ lineHeight: 0 }}>
          {/* SVGで正確な下向き三角を描画（四角の幅に合わせてレスポンシブ） */}
          <svg
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "clamp(36px, 10vw, 60px)", display: "block" }}
          >
            <polygon points="0,0 100,0 50,100" fill="#ffffff" />
          </svg>
          {/* ボタン：三角の下・背景色の上 */}
          <div
            className="flex justify-center py-2"
            style={{ backgroundColor: bgColor }}
          >
            <button
              onClick={() => setOpen(true)}
              className="text-sm font-bold"
              style={{ color: btnColor }}
            >
              詳しく見る
            </button>
          </div>
        </div>
      )}

      {/* ③ 展開エリア：アニメーション付き */}
      <div
        style={{
          maxHeight: open ? "600px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        <div
          className="px-3 pb-6 pt-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0 0 8px 8px",
          }}
        >
          <div style={{ color: "#3B3C3E" }}>{children}</div>
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 text-xl"
              aria-label="閉じる"
            >
              ▲
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
