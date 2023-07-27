import { defineStore } from 'pinia';
import { instance as api } from '../libs/axios';

export const useProfileStore = defineStore('profile', {
  // state
  state: () => {
    return {
      profile: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        bio: '',
        birthday: '',
        programmingLanguages: [],
        skills: []
      }
    };
  },

  getters: {},

  actions: {
    getOwnProfile() {
      return new Promise((resolve, reject) => {
        api
          .get('/users/me')
          .then((response) => {
            this.profile = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getProfile(username) {
      return new Promise((resolve, reject) => {
        api
          .get(`users/${username}`)
          .then((response) => {
            this.profile = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // editOwnProfile(profile) {
    //   return new Promise((resolve, reject) => {
    //     const hasFile = profile.profilePictureFile !== null || profile.resumeFile !== null;
    //     let profileFormData;
    //     if (hasFile) {
    //       profileFormData = jsonToFormData(profile);
    //     }
    //     api
    //       .patch('/users/me', hasFile ? profileFormData : profile, {
    //         headers: {
    //           'Content-Type': hasFile ? 'multipart/form-data' : 'application/json'
    //         }
    //       })
    //       .then((response) => {
    //         this.profile = response.data;
    //         resolve(response.data);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
    editOwnProfile(profile) {
      return new Promise((resolve, reject) => {
        api
          .patch('/users/me', profile)
          .then((response) => {
            this.profile = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addProfilePicture(profilePictureFormData) {
      return new Promise((resolve, reject) => {
        api
          .post('users/me/add_profile_pricture', profilePictureFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            this.profile = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addResume(resumeFormData) {
      return new Promise((resolve, reject) => {
        api
          .post('users/me/add_resume', resumeFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            this.profile = response.data;
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    downloadResume(resumeUrl) {
      return new Promise((resolve, reject) => {
        api
          .get(`file/${resumeUrl}`)
          .then((response) => {
            console.log(response);
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
});
