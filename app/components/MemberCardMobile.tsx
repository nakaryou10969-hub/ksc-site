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
  bgColor = "#E3E0DA",
}: Props) {
  const [open, setOpen] = useState(false);
  const btnColor = buttonColor ?? borderColor;

  return (
    <div className="w-[90%] mx-auto" style={{ isolation: "isolate" }}>
      {/* カード全体：白背景の矩形・画像は枠内に収める */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px 8px 0 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* 画像エリア：枠内に収める */}
        <div
          className="relative w-full"
          style={{ height: "clamp(180px, 45vw, 280px)" }}
        >
          {nameSrc && (
            <div
              className="absolute z-0"
              style={{ left: "8%", top: "10%", width: "18%", aspectRatio: "92/241" }}
            >
              <Image src={nameSrc} alt={alt} fill className="object-contain" />
            </div>
          )}
          <div
            className="absolute z-10"
            style={{
              left: nameSrc ? "20%" : "50%",
              transform: nameSrc ? "none" : "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: nameSrc ? "85%" : "90%",
            }}
          >
            <Image src={imageSrc} alt={alt} fill className="object-contain object-center" />
          </div>
        </div>

        {/* 閉じている時のみ：V字のくびれ（背景色の三角） */}
        {!open && (
          <>
            {/* 左三角 */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "50%",
                height: "22%",
                backgroundColor: bgColor,
                clipPath: "polygon(0 100%, 100% 100%, 0 0)",
              }}
            />
            {/* 右三角 */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "50%",
                height: "22%",
                backgroundColor: bgColor,
                clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
              }}
            />
            {/* 詳しく見るボタン */}
            <div
              style={{
                position: "absolute",
                bottom: "2%",
                left: 0,
                right: 0,
                zIndex: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setOpen(true)}
                className="text-sm font-bold"
                style={{ color: btnColor }}
              >
                詳しく見る
              </button>
            </div>
            {/* スペーサー */}
            <div style={{ height: "40px" }} />
          </>
        )}

        {/* 開いている時 */}
        {open && <div style={{ height: "8px" }} />}
      </div>

      {/* 展開エリア：アニメーション付き */}
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
