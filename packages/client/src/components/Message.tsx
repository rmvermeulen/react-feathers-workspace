import React, { FunctionComponent } from 'react';

export interface IMessage {
  text: string;
}

interface Props {
  message: IMessage;
}
export const Message: FunctionComponent<Props> = ({ message }) => {
  return <>{message.text}</>;
};
