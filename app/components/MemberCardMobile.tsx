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
    /* 上にはみ出す分のパディングを確保 */
    <div className="w-[90%] mx-auto" style={{ paddingTop: "clamp(20px, 8vw, 78px)" }}>
      {/* カード全体：白背景の矩形・上方向にoverflowさせる */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px 8px 0 0",
          overflow: "visible",
          position: "relative",
        }}
      >
        {/* 画像エリア：上にはみ出す */}
        <div
          className="relative w-full flex justify-center"
          style={{ height: "clamp(160px, 55vw, 260px)", marginTop: "clamp(-20px, -8vw, -40px)" }}
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

        {/* 閉じている時のみ：V字のくびれ（背景色の三角で下部を切り取り見せる） */}
        {!open && (
          <>
            {/* 左三角 */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "50%",
                height: "18%",
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
                height: "18%",
                backgroundColor: bgColor,
                clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
              }}
            />
            {/* 詳しく見るボタン：三角より手前・V字の頂点付近に絶対配置 */}
            <div
              style={{
                position: "absolute",
                bottom: "6%",
                left: 0,
                right: 0,
                zIndex: 10,
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
            {/* ボタン分の高さを確保（フローレイアウト用スペーサー） */}
            <div style={{ height: "40px" }} />
          </>
        )}

        {/* 開いている時：ボタンなし・三角なし（矩形のまま） */}
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
          <div style={{ color: "#3B3C3E" }}>{children}</div>          <div className="flex justify-center pt-4">
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
