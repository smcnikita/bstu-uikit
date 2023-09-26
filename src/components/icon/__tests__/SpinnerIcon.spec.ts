import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import SpinnerIcon from '../SpinnerIcon.vue';

describe('SpinnerIcon', () => {
  it('test', () => {
    const wrapper = mount(SpinnerIcon);
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.find('circle').exists()).toBe(true);
    expect(wrapper.find('animateTransform').exists()).toBe(true);
  });
});
