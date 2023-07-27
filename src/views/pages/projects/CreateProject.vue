<script setup>
import ProjectCard from '@/components/project/ProjectCard.vue';
import { useToastService } from '@/helpers/toast';

const { showToast } = useToastService();

import { ref, computed, onBeforeMount } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required, url } from '@vuelidate/validators';
import { useProjectsStore } from '@/store/projectsStore';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProgrammingLanguagesStore } from '@/store/programmingLanguagesStore';

import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();

const project = ref({
  title: 'Proyecto',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  link: '',
  paid: false,
  projectPicture: null,
  programmingLanguages: []
});
const rules = computed(() => ({
  project: {
    title: { required, $autoDirty: false },
    description: {
      required,
      maxLength: helpers.withMessage(({ $params }) => t('projects.descriptionLength', { char: $params.max }), maxLength(700))
    },
    link: { url },
    paid: { required },
    programmingLanguages: {
      required: helpers.withMessage(() => t('projects.languagesLength', { min: 1 }), required),
      minLength: helpers.withMessage(({ $params }) => t('projects.languagesLength', { min: $params.min }), minLength(1))
    }
  }
}));
const v$ = useVuelidate(rules, { project }, { $autoDirty: true });

const loading = ref(false);
const projectsStore = useProjectsStore();

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const languagesStore = useProgrammingLanguagesStore();
const { programmingLanguages } = storeToRefs(languagesStore);

const createProject = async () => {
  loading.value = true;
  try {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
    if (route.name === 'editProject') {
      await projectsStore.editProject(project.value);
      showToast({ severity: 'success', summary: 'OK', detail: t('projects.edited'), life: 3000 });
    } else {
      await projectsStore.createProject(project.value);
      showToast({ severity: 'success', summary: 'OK', detail: t('projects.created'), life: 3000 });
    }
    router.push({ name: 'myProfile' });
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: t('projects.uSureDelete'),
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await deleteProject();
    },
    reject: () => {
      return;
    }
  });
};

const deleteProject = async () => {
  loading.value = true;
  try {
    if (!route.name === 'editProject') return;
    await projectsStore.deleteProject(project.value);
    showToast({ severity: 'success', summary: 'OK', detail: t('projects.deleted'), life: 3000 });
    router.push({ name: 'myProfile' });
  } finally {
    loading.value = false;
  }
};

const onFileSelect = (event, name) => {
  const file = event.files[0];
  project.value[name] = file;
};
const removeFile = (name) => {
  project.value[name] = null;
};

const loadingSkills = ref(false);
const isEditView = ref(false);
onBeforeMount(async () => {
  loadingSkills.value = true;
  loading.value = true;
  try {
    await languagesStore.fetchProgrammingLanguage();
    if (route.name === 'editProject') {
      isEditView.value = true;
      const projectResponse = await projectsStore.fetchProject({ id: route.params.id });
      project.value = { ...project.value, ...projectResponse };
    }
  } finally {
    loadingSkills.value = false;
    loading.value = false;
  }
});
</script>

<template>
  <div class="">
    <loading-overlay :loading="loading"></loading-overlay>
    <div class="flex justify-content-between align-items-center">
      <h2 class="mb-0">{{ $t('projects.add') }}</h2>

      <!-- <Button raised class="flex align-items-center">
        <i class="pi pi-plus mr-2" style="font-size: 1.2rem"></i>
        {{ $t('projects.add') }}
      </Button> -->
    </div>

    <div class="grid mt-2">
      <div class="col-12">
        <ProjectCard class="" :project="project"></ProjectCard>
      </div>
      <div class="col-12">
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4">
            <label for="title" class="block text-900 text-xl font-medium mb-2">{{ $t('projects.title') }}</label>
            <InputText
              id="title"
              type="text"
              placeholder=""
              class="w-full"
              style="padding: 1rem"
              v-model="project.title"
              :class="{ 'p-invalid': v$.project.title.$errors.length }"
            />
          </div>
          <div class="col-12 md:col-6 lg:col-4">
            <label for="title" class="block text-900 text-xl font-medium mb-2">{{ $t('projects.link') }}</label>
            <InputText
              id="title"
              type="text"
              placeholder=""
              class="w-full"
              style="padding: 1rem"
              v-model="project.link"
              :class="{ 'p-invalid': v$.project.link.$errors.length }"
            />
            <div v-if="v$.project.link.$error" class="error-message mt-2">
              <InlineMessage severity="error">
                {{ v$.project.link.$errors[0].$message }}
              </InlineMessage>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4">
            <label for="title" class="block text-900 text-xl font-medium mb-2">{{ $t('projects.paid') }}</label>
            <InputSwitch v-tooltip.bottom="$t('projects.wasPaid')" id="title" type="text" placeholder="" class="" v-model="project.paid" />
          </div>
          <div class="col-12">
            <label for="description" class="block text-900 text-xl font-medium mb-2">{{ $t('projects.description') }}</label>
            <Textarea
              v-model="project.description"
              autoResize
              rows="5"
              class="w-full"
              :class="{ 'p-invalid': v$.project.description.$errors.length }"
            />
            <div v-if="v$.project.description.maxLength.$invalid && v$.project.description.$error" class="error-message mt-2">
              <InlineMessage severity="error">
                {{ v$.project.description.$errors[0].$message }}
              </InlineMessage>
            </div>
          </div>
          <div class="col-12">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">{{ $t('titles.programmingLanguages') }}</label>
            <MultiSelect
              v-model="project.programmingLanguages"
              :options="programmingLanguages"
              optionLabel="name"
              :placeholder="$t('titles.programmingLanguages')"
              :maxSelectedLabels="3"
              class="w-full"
            />
            <div v-if="v$.project.programmingLanguages.$error" class="error-message mt-2">
              <InlineMessage severity="error">
                {{ v$.project.programmingLanguages.$errors[0].$message }}
              </InlineMessage>
            </div>
          </div>
          <div class="col-12">
            <label for="profilePictureFile" class="block text-900 text-xl font-medium mb-2">{{ $t('projects.picture') }}</label>
            <FileUpload
              mode="basic"
              chooseIcon="pi pi-trash"
              accept="image/*"
              :maxFileSize="256000"
              customUpload
              @uploader="removeFile('projectPicture')"
              @select="onFileSelect($event, 'projectPicture')"
            />
          </div>
        </div>
        <div class="mt-3 flex">
          <Button raised class="flex align-items-center" :loading="loading" @click="createProject">
            {{ isEditView ? $t('projects.edit') : $t('projects.add') }}
          </Button>
          <ConfirmPopup></ConfirmPopup>
          <Button v-if="isEditView" raised class="flex align-items-center ml-2" severity="danger" :loading="loading" @click="confirmDelete($event)">
            {{ $t('projects.delete') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
