<template>
  <teleport to="body">
    <div
      :id="id"
      ref="modal"
      class="vmModal"
      :class="classes"
      v-bind="attrs"
      @keydown.esc="hide"
      @click="globalClose"
    >
      <div class="vmModal__dialog">
        <div ref="modalContent" class="vmModal__content">
          <vm-button
            variant="iconTertiary"
            class="vmModal__content_closeButton"
            aria-label="Закрыть модальное окно"
            @click="hide"
          >
            <base-icon>
              <cross-icon />
            </base-icon>
          </vm-button>

          <h5 class="vmModal__content_title">{{ title }}</h5>

          <!--suppress TypeScriptValidateTypes -->
          <component
            :is="isComponent"
            class="vmModal__content_body"
            :novalidate="novalidate"
            @submit.prevent="submitted"
          >
            <slot />

            <div
              class="vmModal__content_footer"
              :class="{
                vmModal__content_footer__onlyClose: onlyCloseButton,
                vmModal__footer_end: footerEnd,
              }"
            >
              <slot name="footer">
                <template v-if="onlyCloseButton">
                  <vm-button variant="secondary" @click="hide">{{ closeButtonText }}</vm-button>
                </template>

                <template v-else>
                  <vm-button variant="secondary" @click="hide">{{ closeButtonText }}</vm-button>
                  <vm-button @clicked="success">
                    {{ activeButtonText }}
                  </vm-button>
                </template>
              </slot>
            </div>
          </component>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { VmButton, BaseIcon, CrossIcon } from '@/lib';

const props = withDefaults(
  defineProps<{
    title: string;
    closeButtonText?: string;
    activeButtonText?: string;
    isComponent?: string;
    novalidate?: boolean;
    id?: string;
    classes?: string;
    onlyCloseButton?: boolean;
    closeOnClickMask?: boolean;
    footerEnd?: boolean;
  }>(),
  {
    closeButtonText: 'Отменить',
    activeButtonText: 'Сохранить',
    isComponent: 'div',
    novalidate: false,
    onlyCloseButton: false,
    closeOnClickMask: true,
    footerEnd: false,
  }
);

const emit = defineEmits(['success', 'cancel', 'submitted']);

const modal = ref<HTMLElement | null>(null);
const modalContent = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const showClassList = 'show';

const attrs = computed(() => {
  if (isOpen.value) {
    return { tabindex: '0' };
  } else {
    return {
      'aria-hidden': true,
      tabindex: '-1',
    };
  }
});

// вычисляем гирину скороллбара
const scrollbarWidth = () => {
  const clientWidth = document.documentElement.clientWidth;
  const innerWidth = window.innerWidth;
  return innerWidth - clientWidth;
};

const show = () => {
  const scrollWidth = scrollbarWidth();

  const body = document.querySelector('body');

  modal.value?.classList.add(showClassList);
  body?.classList.add('overflow-hidden');

  if (body) {
    body.style.paddingRight = `${scrollWidth}px`;
  }

  isOpen.value = true;
};

const hide = () => {
  const body = document.querySelector('body');
  modal.value?.classList.remove(showClassList);
  body?.classList.remove('overflow-hidden');

  if (body) {
    body.style.paddingRight = '0px';
  }

  emit('cancel');

  isOpen.value = false;
};

const success = () => emit('success');

const submitted = () => emit('submitted');

const globalClose = (event: Event) => {
  const target = event.target as HTMLElement;

  const containsClass = target.classList.contains('vmModal');

  if (isOpen.value && containsClass && props.closeOnClickMask) {
    hide();
  }
};

defineExpose({
  isOpen,
  show,
  hide,
});
</script>
