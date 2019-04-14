import React, { FunctionComponent, useState } from 'react';
import { evTarget } from '../util';
import { IMessage } from './Message';

interface Props {
  sendMessage(msg: IMessage): void;
}

export const MessageInput: FunctionComponent<Props> = ({ sendMessage }) => {
  const [text, updateText] = useState('');
  return (
    <>
      <input
        type="text"
        placeholder="Enter a message"
        value={text}
        onChange={evTarget(updateText)}
      />
      <button
        disabled={text.length == 0}
        onClick={() => {
          sendMessage({ text });
          updateText('');
        }}
      >
        Send
      </button>
    </>
  );
};
