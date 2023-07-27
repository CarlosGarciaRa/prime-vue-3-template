import { defineStore } from 'pinia';
import { instance as api } from '@/libs/axios';

export const useProgrammingLanguagesStore = defineStore('programmingLanguages', {
  // state
  state: () => {
    return {
      programmingLanguages: []
    };
  },

  getters: {},

  actions: {
    fetchProgrammingLanguage() {
      return new Promise((resolve, reject) => {
        api
          .get('/programming-languages')
          .then((response) => {
            this.programmingLanguages = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createProgrammingLanguage(language) {
      return new Promise((resolve, reject) => {
        api
          .post('/programming-languages', language)
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
