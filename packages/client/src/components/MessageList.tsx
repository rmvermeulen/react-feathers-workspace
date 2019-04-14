import React, { FunctionComponent } from 'react';
import { CompleteMessage } from '../App';
import { Message } from './Message';

interface Props {
  messages: CompleteMessage[];
}

export const MessageList: FunctionComponent<Props> = ({ messages }) => (
  <ul>
    {messages.map(({ id, ...msg }) => (
      <Message key={id} message={msg} />
    ))}
  </ul>
);
