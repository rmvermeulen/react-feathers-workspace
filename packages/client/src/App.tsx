import * as React from 'react';
import { IMessage } from './components/Message';
import { MessageInput } from './components/MessageInput';
import { MessageList } from './components/MessageList';

export interface CompleteMessage extends IMessage {
  id: string;
}

export class App extends React.Component {
  state = {
    messages: [] as CompleteMessage[],
  };
  private currentId = 0;

  private onMessage = (msg: IMessage) => {
    const messages = this.state.messages.concat({
      id: `msg-${this.currentId++}`,
      ...msg,
    });
    this.setState({ messages });
  };
  render() {
    return (
      <>
        <h1>App loaded</h1>
        <p>Message input</p>
        <MessageInput sendMessage={this.onMessage} />
        <br />
        {this.state.messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          <MessageList messages={this.state.messages} />
        )}
      </>
    );
  }
}
