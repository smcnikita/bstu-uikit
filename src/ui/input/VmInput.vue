<template>
  <input
    :id="id"
    class="vmInput"
    :class="{
      vmInput_error: status === 'error',
    }"
    :autofocus="autofocus"
    :disabled="disabled"
    :max="max"
    :maxlength="maxlength"
    :min="min"
    :minlength="minlength"
    :pattern="pattern"
    :placeholder="placeholder"
    :name="name"
    :readonly="readonly"
    :required="required"
    :step="step"
    :type="type"
    :value="modelValue"
    @input="onInput"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script setup lang="ts">
import type { TStatusVmInput } from '@/ui/input/types';

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    status?: TStatusVmInput;
    type?: 'text' | 'number' | 'email' | 'phone' | 'password' | 'date';
    disabled?: boolean;
    autofocus?: boolean;
    required?: boolean;
    readonly?: boolean;
    name?: string;
    step?: number | string;
    max?: number | string;
    min?: number | string;
    maxlength?: number | string;
    minlength?: number | string;
    pattern?: string;
    placeholder?: string;
    id?: string;
    modelModifiers?: { [key: string]: string };
  }>(),
  {
    status: 'default',
    type: 'text',
    disabled: false,
    autofocus: false,
    required: false,
    readonly: false,
    modelModifiers: () => ({}),
  }
);

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'change', 'focus']);

const onInput = (event: Event) => {
  let value = (event.target as HTMLInputElement).value;
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit('update:modelValue', value);
  emit('input', event);
};
</script>
