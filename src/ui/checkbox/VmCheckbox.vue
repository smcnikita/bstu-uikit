<template>
  <label class="vmCheckbox">
    <input
      :id="id"
      type="checkbox"
      class="vmCheckbox__input"
      :checked="modelValue"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :required="required"
      @input="onInput"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
    />
    <span class="vmCheckbox__box" />
    <slot />
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean;
    name?: string;
    id?: string;
    disabled?: boolean;
    readonly?: boolean;
    autofocus?: boolean;
    required?: boolean;
  }>(),
  {
    disabled: false,
    readonly: false,
    autofocus: false,
    required: false,
  }
);

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'change']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
  emit('input', event);
};
</script>
