<template>
  <div
    :id="`${id}-vmSelect`"
    ref="select"
    class="vmSelect"
    :class="{
      open: isOpen,
      disabled: disabled,
      vmSelect__searchIcon: useSearchIcon,
      vmSelect_labelHide: !useLabel,
      vmSelect_withClear: useClear,
      vmSelect_searchOnTop: useSearchOnTop,
    }"
    @keydown.esc="close"
  >
    <label class="vmInput__label" :for="id">{{ label }}</label>
    <base-icon v-if="useSearchIcon" class="vmSelect__search_icon">
      <search-icon />
    </base-icon>
    <vm-input
      :id="id"
      v-model="inputValue"
      class="vmSelect__input"
      readonly
      :placeholder="placeholder"
      :disabled="disabled"
      :status="status"
      :required="required"
      autocomplete="off"
      @click="onClickSelect"
      @keydown.space="onClickSelect"
      @keydown.enter="onClickSelect"
      @keydown.esc="close"
    />
    <button
      v-if="useClear"
      type="button"
      class="vmSelect__btn vmSelect__btn_clear"
      @click="onClear"
    >
      <base-icon class="vmSelect__btn_icon">
        <cross-icon />
      </base-icon>
    </button>
    <button type="button" class="vmSelect__btn" @click="onClickSelect">
      <base-icon class="vmSelect__btn_icon">
        <chevron-down-icon />
      </base-icon>
    </button>

    <div ref="selectWrapper" class="vmSelect__dropdown">
      <div v-if="useSearch" class="vmSelect__searchWrapper">
        <base-icon class="vmSelect__dropdown_search_icon">
          <search-icon />
        </base-icon>
        <vm-input
          v-model.trim="searchText"
          class="vmSelect__dropdown_search"
          placeholder="Поиск"
          autocomplete="off"
          @update:model-value="onSearch"
        />
      </div>
      <ul class="vmSelect__dropdown_list">
        <li v-if="filterOption.length === 0" class="vmSelect__dropdown_notResult">
          {{ noResults }}
        </li>
        <li v-for="(option, index) in filterOption" :key="index" @click="onClickItem(option)">
          <button
            type="button"
            class="vmSelect__dropdown_item"
            :class="{
              vmSelect__item_selected: option.text === inputValue,
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
import { BaseIcon, ChevronDownIcon, SearchIcon, VmInput, CrossIcon } from '@/lib';
import { createPopper } from '@popperjs/core';
import { onClickOutside, useInfiniteScroll } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import type { IVmSelectOptionIntAndStr, TStatusVmInput } from '@/types';

const props = withDefaults(
  defineProps<{
    modelValue: IVmSelectOptionIntAndStr | null;
    options: IVmSelectOptionIntAndStr[];
    id: string;
    label: string;
    placeholder: string;
    disabled?: boolean;
    status?: TStatusVmInput;
    noResults?: string;
    useFilter?: boolean;
    required?: boolean;
    useSearch?: boolean;
    useSearchIcon?: boolean;
    useLabel?: boolean;
    useClear?: boolean;
    useSearchOnTop?: boolean;
  }>(),
  {
    disabled: false,
    status: 'default',
    noResults: 'Ничего не найдено',
    useFilter: false,
    required: false,
    useSearch: true,
    useSearchIcon: false,
    useLabel: true,
    useClear: false,
    useSearchOnTop: false,
  }
);

const emit = defineEmits<{
  (e: 'load'): void;
  (e: 'update:modelValue', data: IVmSelectOptionIntAndStr | null): void;
  (e: 'search', search: string): void;
  (e: 'click', event: 'open' | 'hide'): void;
  (e: 'clear', event: Event): void;
}>();

const clear = () => {
  inputValue.value = '';
  searchText.value = '';
};

const select = ref<HTMLElement | null>(null);
const selectWrapper = ref<HTMLElement | null>(null);

const isOpen = ref(false);
const inputValue = ref('');
const searchText = ref('');

const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);
const toggle = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    emit('click', 'open');
  } else {
    emit('click', 'hide');
  }
};

const filterOption = computed(() => {
  if (props.useFilter) {
    return props.options.filter((el) => {
      return el.text.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase());
    });
  } else {
    return props.options;
  }
});

const onClickSelect = () => {
  if (!props.disabled) {
    toggle();
  }
};

onClickOutside(select, () => (isOpen.value = false));

useInfiniteScroll(selectWrapper, () => emit('load'), { distance: 10 });

const onClickItem = (option: IVmSelectOptionIntAndStr) => {
  inputValue.value = option.text;
  emit('update:modelValue', option);
  close();
};

const onSearch = (event: string) => {
  searchText.value = event;
  emit('search', event);
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

const windowBlur = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(`#${props.id}-vmSelect`)) close();
};

const clearSearch = () => {
  searchText.value = '';
};

const onClear = (event: Event) => {
  clear();
  emit('clear', event);
  emit('update:modelValue', null);
};

defineExpose({
  isOpen,
  open,
  close,
  toggle,
  inputValue,
  clear,
  clearSearch,
});

onMounted(() => {
  createPopper(
    document.getElementById(props.id) as HTMLElement,
    selectWrapper.value as HTMLElement,
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
</script>
