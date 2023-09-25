<template>
  <vm-breadcrumbs>
    <a href="/test">Главная</a>
    <a class="vmBreadcrumbs__item_default" href="#">Ссылка</a>
    <a href="#">Ссылка</a>
  </vm-breadcrumbs>

  <h1 class="vmTitle_1">Страница для тестирования компонентов</h1>

  <div class="vmPageSection">
    <vm-select
      id="select"
      v-model="select.selected"
      :options="select.options"
      label="Select"
      placeholder="Open this select menu"
      use-filter
      use-clear
      use-search-icon
    />
  </div>

  <div class="vmPageSection">
    <vm-combo-box
      id="comboBox"
      v-model="comboBox.selected"
      :options="comboBox.options"
      label="ComboBox"
      placeholder="Test ..."
    />
  </div>
</template>

<script setup lang="ts">
import { VmBreadcrumbs, VmSelect, VmComboBox } from '@/lib';
import { ref } from 'vue';

const select = ref({
  selected: null,
  options: [
    { id: 1, text: 'Test 1' },
    { id: 2, text: 'Test 2' },
    { id: 3, text: 'Test 3' },
    { id: 4, text: 'Test 4' },
    { id: 5, text: 'Test 5' },
    { id: 6, text: 'Test 6' },
    { id: 7, text: 'Test 7' },
    { id: 8, text: 'Test 8' },
    { id: 9, text: 'Test 9' },
    { id: 10, text: 'Test 10' },
  ],
});

const comboBox = ref({
  selected: null,
  options: [
    { id: 1, text: 'Test 1' },
    { id: 2, text: 'Test 2' },
    { id: 3, text: 'Test 3' },
    { id: 4, text: 'Test 4' },
    { id: 5, text: 'Test 5' },
    { id: 6, text: 'Test 6' },
    { id: 7, text: 'Test 7' },
    { id: 8, text: 'Test 8' },
    { id: 9, text: 'Test 9' },
    { id: 10, text: 'Test 10' },
  ],
});
</script>

<style scoped></style>
