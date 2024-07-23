import type { Message, Sender } from 'blip-iframe';
import { v4 as uuidv4 } from 'uuid';

export const httpSender: Sender = async <TData = unknown>(message: Message) => {
  if (message.action !== 'sendCommand') {
    return {
      success: false,
      error: new Error("The REST API doesn't support actions, only commands"),
    } as const;
  }

  const response = await fetch('https://msging.net/commands', {
    method: 'POST',
    headers: {
      // Authorization: '...',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: uuidv4(), ...message.content.command }),
  });

  if (!response.ok) {
    return { success: false, error: new Error(response.statusText) } as const;
  }

  const { resource } = (await response.json()) as { resource: TData };

  return { success: true, data: resource } as const;
};
