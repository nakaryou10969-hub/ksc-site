"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    organization: "",
    email: "",
    category: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          姓: form.lastName,
          名: form.firstName,
          機関組織名: form.organization,
          メールアドレス: form.email,
          メッセージ: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ lastName: "", firstName: "", organization: "", email: "", category: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400";
  const labelClass = "block text-sm mb-1" ;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 姓・名 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: "#3B3C3E" }}>姓</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} style={{ color: "#3B3C3E" }} required />
        </div>
        <div>
          <label className={labelClass} style={{ color: "#3B3C3E" }}>名</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} style={{ color: "#3B3C3E" }} required />
        </div>
      </div>

      {/* 機関・組織名 */}
      <div>
        <label className={labelClass} style={{ color: "#3B3C3E" }}>機関 / 組織名</label>
        <input name="organization" value={form.organization} onChange={handleChange} className={inputClass} style={{ color: "#3B3C3E" }} />
      </div>

      {/* メールアドレス */}
      <div>
        <label className={labelClass} style={{ color: "#3B3C3E" }}>メールアドレス</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} style={{ color: "#3B3C3E" }} required />
      </div>

      {/* お問い合わせ内容（その他） */}
      <div>
        <label className={labelClass} style={{ color: "#3B3C3E" }}>お問い合わせ内容（その他）</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className={inputClass}
          style={{ color: "#3B3C3E" }}
          required
        />
      </div>

      {/* 送信ボタン */}
      <div className="text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-12 py-3 rounded-full text-sm transition-opacity hover:opacity-70 disabled:opacity-50"
          style={{ backgroundColor: "#767676", color: "#FFFFFF" }}
        >
          {status === "sending" ? "送信中..." : "送信"}
        </button>
      </div>

      {status === "success" && (
        <p className="text-center text-sm" style={{ color: "#3B3C3E" }}>送信が完了しました。ありがとうございます。</p>
      )}
      {status === "error" && (
        <p className="text-center text-red-600 text-sm">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}
    </form>
  );
}
