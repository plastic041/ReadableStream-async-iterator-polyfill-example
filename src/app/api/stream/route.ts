function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function* iterator() {
  for (let i = 0; i < 5; i++) {
    await wait(1000);
    yield Math.floor(Math.random() * 100) + "\n";
  }
}

export async function GET(req: Request) {
  return new Response(
    new ReadableStream({
      async pull(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of iterator()) {
          const text = encoder.encode(chunk);
          controller.enqueue(text);
        }
        controller.close();
      },
    })
  );
}
