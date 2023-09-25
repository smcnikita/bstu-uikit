<template>
  <div
    :id="`${id}-vmComboBox`"
    ref="vmComboBox"
    class="vmComboBox"
    :class="{
      open: filter.length > 0 && isOpen && inputValue !== '',
    }"
  >
    <spinner-icon v-if="loading" class="vmComboBox__loading" />
    <label class="vmInput__label" :for="id">{{ label }}</label>
    <vm-input
      :id="id"
      v-model="inputValue"
      class="vmComboBox__input"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="status"
      :required="required"
      :maxlength="maxlength"
      :minlength="minlength"
      autocomplete="off"
      @focus="open"
      @keydown.esc="close"
      @update:model-value="updateModelValue"
    />
    <button
      v-if="isOpen && filter.length > 0 && inputValue"
      type="button"
      class="vmComboBox__btn"
      :disabled="disabled"
      @click="toggle"
    >
      <base-icon class="vmComboBox__btn_icon">
        <chevron-down-icon />
      </base-icon>
    </button>
    <div ref="vmComboBoxWrapper" class="vmComboBox__dropdown">
      <ul class="vmComboBox__dropdown_list">
        <li v-for="(option, index) in filter" :key="index" @click="onClick(option)">
          <button
            type="button"
            class="vmComboBox__item"
            :class="{
              vmComboBox__item_selected: option.text === inputValue,
            }"
          >
            {{ option.text }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIcon, ChevronDownIcon, SpinnerIcon, VmInput } from '@/lib';
import { createPopper } from '@popperjs/core';
import { onClickOutside, useInfiniteScroll } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import type { IVmSelectOptionIntAndStr, TStatusVmInput } from '@/types';

const props = withDefaults(
  defineProps<{
    modelValue: IVmSelectOptionIntAndStr | null;
    loading?: boolean;
    options: IVmSelectOptionIntAndStr[];
    id: string;
    label: string;
    placeholder: string;
    disabled?: boolean;
    status?: TStatusVmInput;
    required?: boolean;
    maxlength?: string;
    minlength?: string;
  }>(),
  {
    loading: false,
    disabled: false,
    status: 'default',
    required: false,
  }
);

const emit = defineEmits<{
  (e: 'load'): void;
  (e: 'update:modelValue', data: IVmSelectOptionIntAndStr): void;
  (e: 'input', data: IVmSelectOptionIntAndStr['text']): void;
}>();

const clear = () => {
  inputValue.value = '';
};

const vmComboBox = ref<HTMLElement | null>(null);
const vmComboBoxWrapper = ref<HTMLElement | null>(null);

const inputValue = ref('');
const isOpen = ref(false);

useInfiniteScroll(vmComboBoxWrapper, () => emit('load'), { distance: 10 });

onClickOutside(vmComboBox, () => (isOpen.value = false));

const filter = computed(() => {
  return props.options.filter((el) => {
    return el.text.toLowerCase().includes(inputValue.value.toLowerCase());
  });
});

const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);
const toggle = () => (isOpen.value = !isOpen.value);

const onClick = (option: IVmSelectOptionIntAndStr) => {
  inputValue.value = option.text;
  emit('update:modelValue', option);
  close();
};

const updateModelValue = (event: IVmSelectOptionIntAndStr['text']) => {
  emit('input', event);
};

const windowBlur = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(`#${props.id}-vmComboBox`)) {
    close();
  }
};

const initModelValue = () => {
  if (props.modelValue === null) {
    clear();
  } else {
    props.options.forEach((el) => {
      if (el.id === props.modelValue?.id) inputValue.value = el.text;
    });
  }
};

watch(
  () => props.modelValue,
  () => initModelValue()
);

onMounted(() => {
  createPopper(
    document.getElementById(props.id) as HTMLElement,
    vmComboBoxWrapper.value as HTMLElement,
    {
      placement: 'bottom-end',
      modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
    }
  );

  initModelValue();

  window.addEventListener('focusin', windowBlur);
});

onUnmounted(() => {
  window.removeEventListener('focusin', windowBlur);
});

defineExpose({ inputValue, clear });
</script>
