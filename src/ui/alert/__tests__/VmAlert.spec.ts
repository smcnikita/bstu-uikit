import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import VmAlert from '../VmAlert.vue';
import BaseIcon from '@/ui/icon/BaseIcon.vue';

describe('VmAlert', () => {
  it('Существование HTML от BaseIcon', () => {
    const wrapper = mount(VmAlert, { slots: { default: 'Уведомление' } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });
  it('Нормальное функционирование slot', () => {
    const wrapper = mount(VmAlert, { slots: { default: 'Уведомление' } });
    expect(wrapper.text()).toBe('Уведомление');
  });
  it('Существование нужных классов при разных вариантах', async () => {
    const wrapper = mount(VmAlert);
    // default variant
    expect(wrapper.classes('vmAlert')).toBe(true);
    expect(wrapper.classes('vmAlert_info')).toBe(true);
    // error variant
    await wrapper.setProps({ variant: 'error' });
    expect(wrapper.classes('vmAlert_error')).toBe(true);
    // info variant
    await wrapper.setProps({ variant: 'info' });
    expect(wrapper.classes('vmAlert_info')).toBe(true);
    // success variant
    await wrapper.setProps({ variant: 'success' });
    expect(wrapper.classes('vmAlert_success')).toBe(true);
    // warning variant
    await wrapper.setProps({ variant: 'warning' });
    expect(wrapper.classes('vmAlert_warning')).toBe(true);
  });
  it('Существование нужных классов у иконок при разных вариантах', async () => {
    const wrapper = mount(VmAlert);
    // default
    let wrapperBaseIcon = wrapper.findComponent(BaseIcon);
    expect(wrapperBaseIcon.classes('vmAlert_icon')).toBe(true);
    expect(wrapperBaseIcon.classes('vmAlert_info_icon')).toBe(true);
    // error
    await wrapper.setProps({ variant: 'error' });
    wrapperBaseIcon = wrapper.findComponent(BaseIcon);
    expect(wrapperBaseIcon.classes('vmAlert_error_icon')).toBe(true);
    // success
    await wrapper.setProps({ variant: 'success' });
    wrapperBaseIcon = wrapper.findComponent(BaseIcon);
    expect(wrapperBaseIcon.classes('vmAlert_success_icon')).toBe(true);
    // info
    await wrapper.setProps({ variant: 'info' });
    wrapperBaseIcon = wrapper.findComponent(BaseIcon);
    expect(wrapperBaseIcon.classes('vmAlert_info_icon')).toBe(true);
    // error
    await wrapper.setProps({ variant: 'error' });
    wrapperBaseIcon = wrapper.findComponent(BaseIcon);
    expect(wrapperBaseIcon.classes('vmAlert_error_icon')).toBe(true);
  });
});
