<template>
  <div
    class="vmAlert"
    :class="{
      vmAlert_success: variant === 'success',
      vmAlert_info: variant === 'info',
      vmAlert_error: variant === 'error',
      vmAlert_warning: variant === 'warning',
    }"
  >
    <base-icon v-if="variant === 'success'" class="vmAlert_icon vmAlert_success_icon">
      <check-circle-icon />
    </base-icon>
    <base-icon v-if="variant === 'info'" class="vmAlert_icon vmAlert_info_icon">
      <info-circle-icon />
    </base-icon>
    <base-icon v-if="variant === 'warning'" class="vmAlert_icon vmAlert_warning_icon">
      <warning-icon />
    </base-icon>
    <base-icon v-if="variant === 'error'" class="vmAlert_icon vmAlert_error_icon">
      <error-circle-icon />
    </base-icon>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { BaseIcon, CheckCircleIcon, InfoCircleIcon, WarningIcon, ErrorCircleIcon } from '@/lib';

type IVmAlertVariant = 'error' | 'info' | 'success' | 'warning';

withDefaults(
  defineProps<{
    variant?: IVmAlertVariant;
  }>(),
  {
    variant: 'info',
  }
);

defineSlots<{
  default(): any;
}>();
</script>
