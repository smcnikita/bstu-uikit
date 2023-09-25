<template>
  <div class="vmFileLoader-wrapper">
    <div class="vmInputFile-wrapper">
      <input
        :id="id"
        ref="input"
        type="file"
        class="vmFileLoader"
        :multiple="multiple"
        :accept="accept"
        :required="required"
        v-bind="computedAttrs"
        @input="handleInput"
      />
      <label
        :for="id"
        class="vmFileLoader__label"
        :class="{
          vmFileLoader__label_error: status === 'error',
          vmFileLoader__label_loading: loading,
        }"
      >
        <span class="vmFileLoader__label-content">
          <base-icon v-if="!loading" class="vmFileLoader__clipsIcon">
            <paperclip-icon />
          </base-icon>
          {{ labelText }}
        </span>
        <span v-if="caption && !loading" class="vmFileLoader__caption">{{ caption }}</span>
      </label>
    </div>

    <ul v-if="fileList && fileList.length !== 0 && status !== 'error'" class="vmFileList">
      <li
        v-for="file in fileList"
        :key="file.name"
        class="vmFileList__item"
        :class="{ vmFileList__item_invalid: checkFileSize(file) }"
      >
        <base-icon class="vmFileList__icon">
          <error-circle-icon v-if="checkFileSize(file)" />
          <paperclip-icon v-else />
        </base-icon>
        {{ file.name }} ({{ getPrettySize(file.size) }})
        <button v-if="!loading" class="vmFileList__deleteButton" @click="deleteFile(file)">
          <base-icon class="vmFileList__buttonIcon">
            <cross-icon />
          </base-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BaseIcon, CrossIcon, ErrorCircleIcon, PaperclipIcon } from '@/lib';

import type { TStatusVmInput } from '@/ui/input/types';
import type { ToastPosition } from 'vue3-toastify';

const props = withDefaults(
  defineProps<{
    status?: TStatusVmInput;
    id: string;
    caption?: string;
    multiple?: boolean;
    loading?: boolean;
    disabled?: boolean;
    accept?: string;
    required?: boolean;
    maxFileSize?: number;
    autoClose?: boolean;
    positionToast?: ToastPosition;
  }>(),
  {
    status: 'default',
    multiple: false,
    loading: false,
    disabled: false,
    required: false,
    maxFileSize: 10,
    autoClose: true,
    positionToast: 'bottom-center',
  }
);

const emit = defineEmits<{
  (e: 'selected', fileList: File[] | null | undefined): void;
  (e: 'delete', fileList: File[] | null | undefined): void;
  (e: 'deletedFile', fileList: File[] | null | undefined): void;
}>();

const fileList = ref<File[] | null | undefined>();
const input = ref<HTMLInputElement | null>(null);

// константы для перевода байт в другие величины
const byteInKB = 1024;
const byteInMB = 1048576;

/**
 * Функция проверки превышения допустимого размера файла. Возвращает true, если размер превышен
 * @param item - файл
 */
const checkFileSize = (item: File) => {
  return item.size > props.maxFileSize * byteInMB;
};

const showToast = () => {
  return alert(`Максимальный размер файла ${props.maxFileSize} МБ`);
};

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  fileList.value = Array.from(input.files as ArrayLike<File>);
  if (fileList.value.some(checkFileSize)) {
    showToast();
  } else {
    emit('selected', fileList.value);
  }
};

const deleteFile = (file: File) => {
  const fileElement = document.getElementById(props.id) as HTMLInputElement;
  fileElement.value = '';

  fileList.value = fileList.value?.filter((item) => item.name !== file.name);
  emit('delete', fileList.value);
  emit('deletedFile', fileList.value);
  if (fileList.value?.some(checkFileSize)) {
    showToast();
  }
};

const reset = () => {
  fileList.value = null;

  const fileElement = document.getElementById(props.id) as HTMLInputElement;
  fileElement.value = '';

  emit('delete', fileList.value);
  emit('deletedFile', fileList.value);
};

/**
 * Функция форматирования размера файла
 * @param size размер файла
 */
const getPrettySize = (size: number) => {
  if (size < byteInKB) {
    return `${size} Б`;
  } else if (size >= byteInKB && size < byteInMB) {
    return `${(size / byteInKB).toFixed(1)} КБ`;
  } else if (size >= byteInMB) {
    return `${(size / byteInMB).toFixed(1)} МБ`;
  }
};

const labelText = computed(() => {
  return props.loading ? 'Загрузка...' : 'Прикрепить файл';
});

const computedAttrs = computed(() => {
  if (props.loading) return { disabled: true };
  else return { disabled: props.disabled };
});

defineExpose({ fileList, reset });
</script>

<style scoped></style>
