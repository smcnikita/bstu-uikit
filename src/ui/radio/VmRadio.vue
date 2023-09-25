<template>
  <label class="vmRadio" @click="onClickLabel">
    <input
      :id="id"
      ref="input"
      type="radio"
      class="vmRadio__input"
      :checked="modelValue?.toString() === value"
      :name="name"
      :disabled="disabled"
      :autofocus="autofocus"
      :required="required"
      :value="value"
      @input="onInput"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
    />
    <span class="vmRadio__box" />
    <slot />
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    value: string;
    name: string;
    id?: string;
    disabled?: boolean;
    autofocus?: boolean;
    required?: boolean;
  }>(),
  {
    disabled: false,
    autofocus: false,
    required: false,
  }
);

const input = ref<HTMLInputElement | null>(null);

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'change', 'click']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('input', event);
};

const onClickLabel = () => {
  emit('update:modelValue', props.value);
  emit('input', input.value);
  emit('click', { value: props.value, name: props.name });
};
</script>
