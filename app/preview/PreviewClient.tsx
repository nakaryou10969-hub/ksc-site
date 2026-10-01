"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EventArticle, { type EventArticleData } from "@/app/components/EventArticle";
import { readPreviewRequest, type PreviewRequest } from "@/libs/previewInput";
import { normalizePreviewContent, sanitizePreviewHtml } from "@/libs/previewContent";
import { renderEventContent } from "@/libs/renderEventContent";
import styles from "./preview.module.css";

type PreviewState =
  | { status: "loading" }
  | { status: "error"; message: string; retryable?: boolean }
  | { status: "ready"; event: EventArticleData; articleContent?: string };

const invalidUrlMessage = "プレビューURLを確認できませんでした。microCMSの編集画面から、プレビューを開き直してください。";
const fetchErrorMessage = "下書きを取得できませんでした。プレビューの認証とmicroCMSの下書きを確認し、再取得してください。";

export default function PreviewClient() {
  const [state, setState] = useState<PreviewState>({ status: "loading" });
  const requestRef = useRef<PreviewRequest | null>(null);
  const initializedRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);

  const loadPreview = useCallback(async (request: PreviewRequest) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: "loading" });
    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Preview-Request": "1" },
        body: JSON.stringify(request),
        credentials: "same-origin",
        cache: "no-store",
        redirect: "error",
        referrerPolicy: "no-referrer",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Preview unavailable");
      const payload: unknown = await response.json();
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid content");
      const event = normalizePreviewContent((payload as Record<string, unknown>).content, request.contentId);
      if (!event) throw new Error("Invalid content");
      const transformed = renderEventContent(event.content, request.contentId);
      const articleContent = transformed ? sanitizePreviewHtml(transformed, window) : undefined;
      if (!controller.signal.aborted) setState({ status: "ready", event, articleContent });
    } catch {
      if (!controller.signal.aborted) setState({ status: "error", message: fetchErrorMessage, retryable: true });
    }
  }, []);

  useEffect(() => {
    if (!initializedRef.current) {
      const url = new URL(window.location.href);
      // Only keep the opaque token in this component's memory. Never store it or log it.
      window.history.replaceState(null, "", url.pathname);
      requestRef.current = readPreviewRequest(url);
      initializedRef.current = true;
    }
    if (requestRef.current) void loadPreview(requestRef.current);
    else setState({ status: "error", message: invalidUrlMessage });

    const discardPreview = () => {
      controllerRef.current?.abort();
      requestRef.current = null;
      setState({ status: "error", message: invalidUrlMessage });
    };
    window.addEventListener("pagehide", discardPreview);
    return () => {
      controllerRef.current?.abort();
      window.removeEventListener("pagehide", discardPreview);
    };
  }, [loadPreview]);

  const cancel = () => {
    controllerRef.current?.abort();
    setState({ status: "error", message: "取得を中止しました。再取得して、最新の下書きを確認できます。", retryable: Boolean(requestRef.current) });
  };

  const controls = (
    <aside className={styles.notice} aria-label="プレビュー操作">
      <div className={styles.noticeInner}>
        <p>下書きプレビューです。公開ページには反映されていません。</p>
        {state.status === "loading" ? (
          <button type="button" onClick={cancel}>取得を中止</button>
        ) : state.status === "ready" || state.retryable ? (
          <button type="button" onClick={() => { if (requestRef.current) void loadPreview(requestRef.current); }}>再取得</button>
        ) : null}
      </div>
    </aside>
  );

  if (state.status === "ready") {
    return <EventArticle event={state.event} articleContent={state.articleContent} previewControls={controls} />;
  }

  return (
    <main className="pt-[72px] lg:pt-[147px]" aria-busy={state.status === "loading"}>
      {controls}
      <section className={styles.status}>
        <h1>記事プレビュー</h1>
        <p role={state.status === "error" ? "alert" : "status"}>
          {state.status === "loading" ? "最新の下書きを読み込んでいます。" : state.message}
        </p>
      </section>
    </main>
  );
}
