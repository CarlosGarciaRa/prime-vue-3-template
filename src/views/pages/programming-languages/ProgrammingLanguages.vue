<script setup>
import LanguageCard from '@/components/programming-languages/LanguageCard.vue';
import { onBeforeMount, ref } from 'vue';
import { useProgrammingLanguagesStore } from '../../../store/programmingLanguagesStore';
import { storeToRefs } from 'pinia';

const languagesStore = useProgrammingLanguagesStore();
const { programmingLanguages } = storeToRefs(languagesStore);
const loading = ref(false);
onBeforeMount(async () => {
  try {
    loading.value = true;
    await languagesStore.fetchProgrammingLanguage();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="">
    <div class="flex justify-content-between align-items-center">
      <h2 class="mb-0">{{ $t('titles.programmingLanguages') }}</h2>

      <Button raised class="flex align-items-center" @click="$router.push({ name: 'addProgrammingLanguage' })">
        <i class="pi pi-plus mr-2" style="font-size: 1.2rem"></i>
        {{ $t('programmingLanguages.add') }}
      </Button>
    </div>

    <div class="grid mt-2">
      <div class="col-12 sm:col-6 lg:col-4 xl:col-3" v-for="language in programmingLanguages" :language="language" :key="language.id">
        <LanguageCard class="h-full" :language="language"></LanguageCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
