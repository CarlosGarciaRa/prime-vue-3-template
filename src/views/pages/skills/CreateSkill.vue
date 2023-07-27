<script setup>
import SkillCard from '@/components/skills/SkillCard.vue';
import { useToastService } from '@/helpers/toast';

const { showToast } = useToastService();

import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useSkillsStore } from '@/store/skillsStore';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const skill = ref({
  name: 'Habilidad',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
});

const rules = computed(() => ({
  skill: {
    name: { required, $autoDirty: false },
    description: { required }
  }
}));
const v$ = useVuelidate(rules, { skill }, { $autoDirty: true });

const loading = ref(false);
const skillsStore = useSkillsStore();

const { t } = useI18n();
const router = useRouter();

const createSkill = async () => {
  loading.value = true;
  try {
    await skillsStore.createSkill(skill.value);
    showToast({ severity: 'success', summary: 'OK', detail: t('skills.created'), life: 3000 });
    router.push({ name: 'skills' });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="">
    <div class="flex justify-content-between align-items-center">
      <h2 class="mb-0">{{ $t('skills.add') }}</h2>

      <!-- <Button raised class="flex align-items-center">
        <i class="pi pi-plus mr-2" style="font-size: 1.2rem"></i>
        {{ $t('skills.add') }}
      </Button> -->
    </div>

    <div class="grid mt-2">
      <div class="col-12 md:col-6 lg:col-5 xl:col-3">
        <SkillCard class="w-full" :skill="skill"></SkillCard>
      </div>
      <div class="col-12 md:col-6 lg:col-7 xl:col-9">
        <div>
          <label for="email1" class="block text-900 text-xl font-medium mb-2">{{ $t('skills.name') }}</label>
          <InputText
            id="email1"
            type="text"
            placeholder=""
            class="w-full mb-5"
            style="padding: 1rem"
            v-model="skill.name"
            :class="{ 'p-invalid': v$.skill.name.$errors.length }"
          />
        </div>
        <div>
          <label for="email1" class="block text-900 text-xl font-medium mb-2">{{ $t('skills.description') }}</label>
          <Textarea v-model="skill.description" autoResize rows="5" class="w-full" :class="{ 'p-invalid': v$.skill.description.$errors.length }" />
        </div>
        <div class="mt-3">
          <Button raised class="flex align-items-center" :loading="loading" @click="createSkill">
            {{ $t('skills.add') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
