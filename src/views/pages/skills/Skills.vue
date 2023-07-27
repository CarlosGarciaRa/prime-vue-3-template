<script setup>
import SkillCard from '@/components/skills/SkillCard.vue';
import { onBeforeMount, ref } from 'vue';
import { useSkillsStore } from '@/store/skillsStore';
import { storeToRefs } from 'pinia';

const skillsStore = useSkillsStore();
const { skills } = storeToRefs(skillsStore);
const loading = ref(false);
onBeforeMount(async () => {
  try {
    loading.value = true;
    await skillsStore.fetchSkills();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="">
    <div class="flex justify-content-between align-items-center">
      <h2 class="mb-0">{{ $t('titles.skills') }}</h2>

      <Button raised class="flex align-items-center" @click="$router.push({ name: 'addSkill' })">
        <i class="pi pi-plus mr-2" style="font-size: 1.2rem"></i>
        {{ $t('skills.add') }}
      </Button>
    </div>

    <div class="grid mt-2">
      <div class="col-12 sm:col-6 lg:col-4 xl:col-3" v-for="skill in skills" :skill="skill" :key="skill.id">
        <SkillCard class="h-full" :skill="skill"></SkillCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
