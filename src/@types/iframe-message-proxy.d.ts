type EventAction =
  | 'sendCommand'
  | 'startLoading'
  | 'stopLoading'
  | 'heightChange'
  | 'stateChangeSuccess'
  | 'showModal'
  | 'hideNavbar'
  | 'showNavbar'
  | 'getCurrentLanguage'
  | 'toast'
  | 'getApplication'
  | 'hasPermissions'
  | 'getPermissionsObject'
  | 'segment';

interface Message {
  action: EventAction;
  content?: unknown;
  caller?: string;
  fireAndForget?: boolean;
}

interface TrackingProperties {
  id: string;
}

interface Options {
  prefix?: string;
  caller?: string;
  receiveWindow?: Window;
  targetWindow?: Window;
  shouldHandleMessage?: (message: {
    message: Message;
    trackingProperties: TrackingProperties;
  }) => boolean;
}

interface IframeMessageProxyType {
  config: (options?: Options) => IframeMessageProxyType;
  listen: () => void;
  stopListen: () => void;
  sendMessage: (payload: Message) => Promise<{
    response: unknown;
    trackingProperties: TrackingProperties;
  }>;
}

declare module 'iframe-message-proxy' {
  export const IframeMessageProxy: IframeMessageProxyType;
}
