import { defineStore } from 'pinia';
import { instance as api } from '@/libs/axios';

export const useSkillsStore = defineStore('skills', {
  // state
  state: () => {
    return {
      skills: []
    };
  },

  getters: {},

  actions: {
    fetchSkills() {
      return new Promise((resolve, reject) => {
        api
          .get('/skills')
          .then((response) => {
            this.skills = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createSkill(skill) {
      return new Promise((resolve, reject) => {
        api
          .post('/skills', skill)
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
