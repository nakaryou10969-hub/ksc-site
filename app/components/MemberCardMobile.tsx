"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  /** キャラクター画像 */
  imageSrc: string;
  /** 看板画像（縦テキスト） */
  nameSrc: string;
  /** キャラクターのalt */
  alt: string;
  /** 展開時に表示するテキスト（JSX可） */
  children: React.ReactNode;
  /** 枠の縁色 */
  borderColor?: string;
};

export default function MemberCardMobile({
  imageSrc,
  nameSrc,
  alt,
  children,
  borderColor = "#001597",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* カード本体 */}
      <div
        className="relative w-full bg-white mx-auto overflow-visible"
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: "8px",
        }}
      >
        {/* 画像エリア：キャラクターが上からはみ出す */}
        <div className="relative w-full flex justify-center" style={{ height: "260px" }}>
          {/* 看板（name）画像 */}
          <div
            className="absolute z-0"
            style={{ left: "8%", top: "20%", width: "18%", aspectRatio: "92/241" }}
          >
            <Image src={nameSrc} alt={alt} fill className="object-contain" />
          </div>
          {/* キャラクター画像（上にはみ出す） */}
          <div
            className="absolute z-10"
            style={{ left: "20%", bottom: 0, width: "72%", aspectRatio: "413/395" }}
          >
            <Image src={imageSrc} alt={alt} fill className="object-contain object-bottom" />
          </div>
        </div>

        {/* 展開エリア */}
        {open && (
          <div className="px-6 pb-4 pt-2" style={{ color: "#C79500" }}>
            {children}
          </div>
        )}

        {/* 詳しく見る / 閉じる ボタン */}
        <div className="flex justify-center py-3">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="text-sm font-bold"
              style={{ color: "#001597" }}
            >
              詳しく見る
            </button>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 text-xl"
              aria-label="閉じる"
            >
              ▲
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
