import { defineStore } from 'pinia';
import { instance as api } from '@/libs/axios';
import { jsonToFormData } from '@/helpers/jsonToFormData';

export const useProjectsStore = defineStore('projects', {
  // state
  state: () => {
    return {
      projects: [],
      project: {}
    };
  },

  getters: {},

  actions: {
    fetchProjects({ byUser }) {
      return new Promise((resolve, reject) => {
        api
          .get('/projects', {
            params: {
              byUser
            }
          })
          .then((response) => {
            this.projects = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    fetchProject({ id }) {
      return new Promise((resolve, reject) => {
        api
          .get(`/projects/${id}`)
          .then((response) => {
            this.project = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createProject(project) {
      let payload;
      let hasFile = false;
      if (project.projectPicture) {
        hasFile = true;
        payload = jsonToFormData(project);
      } else {
        payload = { ...project };
      }
      return new Promise((resolve, reject) => {
        api
          .post('/projects', payload, {
            headers: {
              'Content-Type': hasFile ? 'multipart/form-data' : 'application/json'
            }
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    editProject(project) {
      return new Promise((resolve, reject) => {
        let payload;
        let hasFile = false;
        if (project.projectPicture) {
          hasFile = true;
          payload = jsonToFormData(project);
        } else {
          payload = { ...project };
        }
        api
          .patch(`/projects/${project.id}`, payload, {
            headers: {
              'Content-Type': hasFile ? 'multipart/form-data' : 'application/json'
            }
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteProject(project) {
      return new Promise((resolve, reject) => {
        api
          .delete(`/projects/${project.id}`, project)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
});
