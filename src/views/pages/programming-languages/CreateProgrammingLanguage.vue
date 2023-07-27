<script setup>
import LanguageCard from '@/components/programming-languages/LanguageCard.vue';
import { useToastService } from '@/helpers/toast';

const { showToast } = useToastService();

import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useProgrammingLanguagesStore } from '@/store/programmingLanguagesStore';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const language = ref({
  name: 'Lenguaje Titulo 2',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
});

const rules = computed(() => ({
  language: {
    name: { required, $autoDirty: false },
    description: { required }
  }
}));
const v$ = useVuelidate(rules, { language }, { $autoDirty: true });

const loading = ref(false);
const pLanguageStore = useProgrammingLanguagesStore();

const { t } = useI18n();
const router = useRouter();

const createLanguage = async () => {
  loading.value = true;
  try {
    await pLanguageStore.createProgrammingLanguage(language.value);
    showToast({ severity: 'success', summary: 'OK', detail: t('programmingLanguages.created'), life: 3000 });
    router.push({ name: 'programmingLanguages' });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="">
    <div class="flex justify-content-between align-items-center">
      <h2 class="mb-0">{{ $t('programmingLanguages.add') }}</h2>

      <!-- <Button raised class="flex align-items-center">
        <i class="pi pi-plus mr-2" style="font-size: 1.2rem"></i>
        {{ $t('programmingLanguages.add') }}
      </Button> -->
    </div>

    <div class="grid mt-2">
      <div class="col-12 md:col-6 lg:col-5 xl:col-3">
        <LanguageCard class="w-full" :language="language"></LanguageCard>
      </div>
      <div class="col-12 md:col-6 lg:col-7 xl:col-9">
        <div>
          <label for="email1" class="block text-900 text-xl font-medium mb-2">{{ $t('programmingLanguages.name') }}</label>
          <InputText
            id="email1"
            type="text"
            placeholder=""
            class="w-full mb-5"
            style="padding: 1rem"
            v-model="language.name"
            :class="{ 'p-invalid': v$.language.name.$errors.length }"
          />
        </div>
        <div>
          <label for="email1" class="block text-900 text-xl font-medium mb-2">{{ $t('programmingLanguages.description') }}</label>
          <Textarea
            v-model="language.description"
            autoResize
            rows="5"
            class="w-full"
            :class="{ 'p-invalid': v$.language.description.$errors.length }"
          />
        </div>
        <div class="mt-3">
          <Button raised class="flex align-items-center" :loading="loading" @click="createLanguage">
            {{ $t('programmingLanguages.add') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
