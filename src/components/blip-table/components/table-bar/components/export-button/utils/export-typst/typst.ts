export interface TypstFile {
  name: string;
  id: string;
  content: {
    source: string;
  };
}

export interface UnknownData {
  kind: string;
  [key: string]: unknown;
}

export class Typst {
  requests: Record<string, (event: MessageEvent) => void> = {};
  queue: unknown[] = [];
  waiting = true;
  callbacks: Record<string, (event: MessageEvent) => void> = {};
  worker;

  constructor({ files, previewed }: { files: TypstFile[]; previewed: string }) {
    this.worker = new Worker(
      new URL('/assets/typst-worker.js', self.location as unknown as string),
      { type: 'module' },
    );

    this.queue = [];
    this.worker.onmessage = (event) => {
      this.waiting = false;

      for (const callback of Object.values(this.callbacks)) {
        callback(event);
      }

      this.dequeue();
    };

    this.send({ kind: 'initialize', files });

    this.send({
      kind: 'update',
      changes: [],
      uiTasks: {
        type: 'uiTasks',
        previewed,
        edited: {
          fileId: previewed,
          ranges: [0, 0],
        },
        transient: [],
        link: {
          fileId: previewed,
          pos: 0,
        },
      },
    });
  }

  send(args: unknown) {
    this.enqueue(args);
    this.dequeue();
  }

  enqueue(args: unknown) {
    this.queue.push(args);
  }

  dequeue() {
    if (this.waiting) return;
    if (this.queue.length <= 0) return;

    this.worker.postMessage(this.queue.shift());
    this.waiting = true;
  }

  subscribe<T = UnknownData>(callback: (event: MessageEvent<T>) => void) {
    const id = Math.random();
    this.callbacks[id] = callback;

    return () => this.unsubscribe(id);
  }

  unsubscribe(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.callbacks[id];
  }
}
