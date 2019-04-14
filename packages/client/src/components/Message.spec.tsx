import { shallow } from 'enzyme';
import * as React from 'react';
import { Message } from './Message';

describe('Message', () => {
  it('renders', () => {
    const message = {
      text: 'some text',
    };
    const wrapper = shallow(<Message message={message} />);
    expect(wrapper.text()).toContain(message.text);
  });
});
