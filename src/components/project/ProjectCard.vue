<script setup>
import { fileRoute } from '@/helpers/fileRoute';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import templateProjectPicture from '@/assets/images/programming-languages.png';
const props = defineProps({
  project: {
    id: String,
    title: String,
    description: String,
    paid: Boolean,
    link: String,
    imageUrl: String,
    projectPicture: Object,
    programmingLanguages: Array
  }
});

const router = useRouter();
const route = useRoute();

const projectPicture = computed(() => {
  if (props.project.projectPicture) {
    return URL.createObjectURL(props.project.projectPicture);
  } else if (props.project.imageUrl) {
    return `${fileRoute}${props.project.imageUrl}`;
  } else {
    return templateProjectPicture;
  }
});
</script>

<template>
  <div class="card grid p-0 m-0 mb-3 project-card">
    <div class="col-12 sm:col-5 md:col-4 lg:col-3 p-0 flex justify-content-center bg-cyan-50 border-round h-full imgProject">
      <Image :src="projectPicture" imageClass="w-full h-full imgProject" clas alt="Image" imageStyle="object-fit: cover;" />
    </div>
    <div class="col-12 sm:col-7 md:col-8 lg:col-9 flex flex-column h-full">
      <div class="flex justify-content-between">
        <div class="flex align-items-center mb-3">
          <h4 class="mr-3 mb-0 font-medium">{{ project.title }}</h4>
          <i
            v-if="route.name === 'myProfile'"
            @click="router.push({ name: 'editProject', params: { id: project.id } })"
            v-tooltip.right="$t('projects.edit')"
            class="pi pi-file-edit cursor-pointer"
            style="font-size: 1.2rem; color: blue"
          ></i>
        </div>
        <i v-if="project.paid" v-tooltip.left="$t('projects.wasPaid')" class="pi pi-dollar mr-2" style="font-size: 1.3rem; color: green"></i>
      </div>
      <p class="overflow-container mb-1">
        {{ project.description }}
      </p>
      <a v-if="project.link" :href="project.link" class="" target="_blank">Link del proyecto</a>
      <div v-if="project.programmingLanguages.length > 0" class="flex flex-column my-4">
        <h4 class="flex align-items-center my-0">{{ $t('titles.programmingLanguages') }}</h4>
        <div class="flex flex-wrap gap-2 mt-2">
          <Tag v-for="language in project.programmingLanguages" :key="language.id" :value="language.name" class=""></Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overflow-container {
  overflow: auto; /* Crea una barra de desplazamiento cuando sea necesario */
  height: 90px; /* Establece una altura máxima para el contenedor */
}
.project-card {
  height: 270px;
}

@media (max-width: 575px) {
  .project-card {
    height: auto;
  }
  .imgProject {
    height: 180px !important;
  }
}
</style>
