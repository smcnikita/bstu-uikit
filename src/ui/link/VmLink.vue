<template>
  <component :is="is" class="vmLink" v-bind="attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IDefaultProps } from './types';

const props = withDefaults(
  defineProps<{
    is?: 'a' | 'RouterLink' | 'NuxtLink';
    variant?: 'primary' | 'secondary';
    useIcon?: boolean;
    href?: string;
    disabled?: boolean;
    target?: '_self' | '_blank' | '_parent' | '_top';
    useEp?: boolean;
  }>(),
  {
    is: 'a',
    variant: 'primary',
    useIcon: false,
    target: '_self',
    useEp: false,
  }
);

const attrs = computed(() => {
  const defaultProps: IDefaultProps = {
    class: {
      vmLink_primary: props.variant === 'primary',
      vmLink_secondary: props.variant === 'secondary',
      vmLink_withIcon: props.useIcon,
      vmLinkEp: props.useEp,
    },
    target: props.is === 'a' ? props.target : null,
  };

  if (props.is === 'a') {
    defaultProps.href = props.href;
    if (props.disabled) {
      defaultProps.class.vmLink_disabled = true;
      defaultProps.href = null;
    }
  } else {
    defaultProps.to = props.href;
  }

  return defaultProps;
});
</script>

<style lang="scss" scoped></style>
