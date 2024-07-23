import { IframeMessageProxy } from 'iframe-message-proxy';

const showModal = ({ title, body, confirm = 'ok', cancel = 'cancel' }) => {
  return IframeMessageProxy.sendMessage({
    action: 'showModal',
    content: {
      title,
      body,
      confirm,
      cancel,
    },
  });
};

export default showModal;
