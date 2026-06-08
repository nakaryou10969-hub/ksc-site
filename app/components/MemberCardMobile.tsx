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
};

export default function MemberCardMobile({
  imageSrc,
  nameSrc,
  alt,
  children,
  borderColor = "#001597",
  buttonColor,
}: Props) {
  const [open, setOpen] = useState(false);
  const btnColor = buttonColor ?? borderColor;

  // 逆五角形のclip-path（上部長方形＋下部V字）
  const pentagonClip = "polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%)";

  return (
    <div className="w-full relative">
      {/* 五角形エリア（枠線なし・白背景） */}
      <div
        style={{
          clipPath: pentagonClip,
          backgroundColor: "#ffffff",
          borderRadius: "8px 8px 0 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* 画像エリア */}
        <div className="relative w-full flex justify-center" style={{ height: "280px" }}>
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
              width: nameSrc ? "72%" : "80%",
              aspectRatio: "1/1",
            }}
          >
            <Image src={imageSrc} alt={alt} fill className="object-contain object-bottom" />
          </div>
        </div>

        {/* 詳しく見る ボタン（五角形内・閉じている時のみ） */}
        {!open && (
          <div className="flex justify-center pb-10 pt-2">
            <button
              onClick={() => setOpen(true)}
              className="text-sm font-bold"
              style={{ color: btnColor }}
            >
              詳しく見る
            </button>
          </div>
        )}
        {/* 開いた状態：ボタン分の高さを確保 */}
        {open && <div style={{ height: "40px" }} />}
      </div>

      {/* 展開時：五角形のV字カット部分（両脇の三角の欠け）を白で塞ぐオーバーレイ */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            /* 五角形の高さ全体（280px画像 + 40pxボタン = 320px）の
               下18%（V字部分）をカバーする高さ */
            height: "calc(320px * 0.18 + 2px)",
            backgroundColor: "#ffffff",
            zIndex: 2,
          }}
        />
      )}

      {/* 展開エリア（枠線なし・白背景・五角形と連続） */}
      {open && (
        <div
          className="px-6 pb-6 pt-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0 0 8px 8px",
            position: "relative",
            zIndex: 3,
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
      )}
    </div>
  );
}
