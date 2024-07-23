import { IframeMessageProxy } from 'iframe-message-proxy';

const showToast = async (toast) => {
  await IframeMessageProxy.sendMessage({
    action: 'toast',
    content: toast,
  });
};

export default showToast;
