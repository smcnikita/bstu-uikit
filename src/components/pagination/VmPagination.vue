<template>
  <div class="vmPagination">
    <vm-pagination-button
      v-if="page !== 1"
      is-next
      aria-label="Вернуться к предыдущей странице"
      @click="prev"
      >Назад</vm-pagination-button
    >

    <template v-for="item in items" :key="item">
      <div v-if="item === '...'" class="vmPagination__button support">
        {{ item }}
      </div>

      <vm-pagination-button
        v-else
        :selected="page === item"
        :aria-label="`Переход на страницу ${item}`"
        @click="onClick(item as number)"
      >
        {{ item }}
      </vm-pagination-button>
    </template>

    <vm-pagination-button
      v-if="page !== countPage"
      is-next
      aria-label="Следующая страница"
      @click="next"
    >
      Далее
    </vm-pagination-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VmPaginationButton from './components/VmPaginationButton.vue';

import type { TVmPaginationCount, TVmPaginationCountOnPage, TVmPaginationPage } from './types';

const props = defineProps<{
  /** Текущая страница */
  page: TVmPaginationPage;
  /** Сколько всего записей */
  count: TVmPaginationCount;
  /** Сколько выводится записей на странице */
  countOnPage: TVmPaginationCountOnPage;
}>();

const emit = defineEmits<{
  (e: 'click', newPage: number): void;
}>();

/** Сколько всего страниц */
const countPage = computed(() => {
  return Math.ceil(props.count / props.countOnPage);
});

const items = computed(() => {
  const returnData = [];

  if (countPage.value < 10) {
    // если страниц не больше 9
    for (let index = 1; index <= countPage.value; index++) {
      returnData.push(index);
    }
  }

  if (countPage.value >= 10) {
    // если страниц больше или 10
    if (props.page < 7) {
      for (let index = 1; index <= 7; index++) {
        returnData.push(index);
      }
      returnData.push('...');
      returnData.push(countPage.value);
    }

    const isPageAndLastPage =
      props.page === countPage.value ||
      props.page === countPage.value - 1 ||
      props.page === countPage.value - 2 ||
      props.page === countPage.value - 3;

    if (props.page >= 7 && isPageAndLastPage) {
      if (props.page === countPage.value || props.page === countPage.value - 1) {
        returnData.push(1);
        returnData.push('...');

        if (props.page === countPage.value) {
          returnData.push(props.page - 3);
        }

        returnData.push(props.page - 2);
        returnData.push(props.page - 1);
        returnData.push(props.page);
        if (props.page === countPage.value - 1) {
          returnData.push(countPage.value);
        }
      } else {
        returnData.push(1);
        returnData.push('...');
        returnData.push(props.page - 1);
        returnData.push(props.page);
        returnData.push(props.page + 1);
        returnData.push('...');
        returnData.push(countPage.value);
      }
    }

    if (props.page >= 7 && !isPageAndLastPage) {
      returnData.push(1);
      returnData.push('...');
      returnData.push(props.page - 1);
      returnData.push(props.page);
      returnData.push(props.page + 1);

      if (props.page !== countPage.value) {
        returnData.push('...');
        returnData.push(countPage.value);
      }
    }
  }

  return returnData;
});

const next = () => {
  emit('click', props.page + 1);
};

const prev = () => {
  emit('click', props.page - 1);
};

const onClick = (newPage: number) => {
  emit('click', newPage);
};
</script>
