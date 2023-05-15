"use client";

import { useEffect, useState } from "react";

ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
  const reader = this.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
};

export function Data() {
  const [text, setText] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchStream() {
      const response = await fetch("/api/stream", {
        signal: abortController.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const decoder = new TextDecoder();

      // if (!response.body[Symbol.asyncIterator]) {
      //   response.body[Symbol.asyncIterator] = () => {
      //     const reader = response.body!.getReader();
      //     return {
      //       next: () => reader.read(),
      //       return: () => {
      //         reader.releaseLock();
      //       },
      //     };
      //   };
      // }

      for await (const chunk of response.body) {
        const decoded = decoder.decode(chunk);
        setText((text) => text + decoded);
      }
    }

    fetchStream();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <p className="whitespace-pre-wrap tabular-nums text-xs">{text}</p>
    </div>
  );
}
