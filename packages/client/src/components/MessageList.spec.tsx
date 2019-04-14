import { shallow } from 'enzyme';
import * as React from 'react';
import { MessageList } from './MessageList';

describe('Message list', () => {
  it('renders empty list', () => {
    const wrapper = shallow(<MessageList messages={[]} />);
    expect(wrapper.isEmptyRender()).toBeFalse();
  });

  it('renders list of messages', () => {
    const messages = [
      { id: '0', text: 'some text' },
      { id: '1', text: 'some more text' },
      { id: '2', text: 'even more text' },
    ];
    const wrapper = shallow(<MessageList messages={messages} />);
    expect(wrapper.isEmptyRender()).toBeFalse();
  });
});
