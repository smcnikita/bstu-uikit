<template>
  <div :id="id" class="vmInputGroup">
    <label v-if="useLabel && label !== ''" class="vmInput__label" :for="idInput">{{ label }}</label>

    <slot />
    <!--suppress TypeScriptValidateTypes -->
    <component
      :is="messageIs"
      v-if="useMessage"
      class="vmInput__message"
      :class="{
        vmInput__message_error: status === 'error',
      }"
    >
      <base-icon v-if="status === 'error'" class="vmInput__message_icon">
        <error-circle-icon />
      </base-icon>
      {{ message }}
      <slot name="messageText" />
    </component>

    <slot name="message" />
  </div>
</template>

<script setup lang="ts">
import { BaseIcon, ErrorCircleIcon } from '@/lib';

// types
import type { TStatusVmInput } from '@/ui/input/types';

withDefaults(
  defineProps<{
    status?: TStatusVmInput;
    id?: string;
    idInput?: string;
    label?: string;
    message?: string;
    messageIs?: string;
    useMessage?: boolean;
    useLabel?: boolean;
  }>(),
  {
    status: 'default',
    messageIs: 'p',
    useMessage: true,
    useLabel: true,
  }
);
</script>
