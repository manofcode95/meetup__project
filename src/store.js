import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import router from '@/router/index';
import db from '@/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    loadedMeetups: []
  },
  getters: {
    meetups(state) {
      // if (state.user) {
      //   return state.loadedMeetups.sort((meetupA, meetupB) => {
      //     return meetupA.date < meetupB.date;
      //   });
      // }
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date < meetupB.date;
      })

    },
    loadedMeetup: (state) => (id) => {
      if (state.user) {
        return state.loadedMeetups.find((meetup) => meetup.id == id);
      }
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
    isAuthenticated(state) {
      if (state.user) {
        return true;
      }
      return false;
    },
    isCreator: (state) => creatorId => state.user.id == creatorId

  },
  mutations: {
    setUser(state, payload) {
      if (payload != null) {
        state.user = payload;
      } else {
        state.user = null;
      }
    },

    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    beforeSubmit(state) {
      (state.error = null), (state.loading = true);
    },
    afterLoadingPage(state) {
      (state.error = null), (state.loading = false);
    },

  },
  actions: {
    submitSignUp({ commit, state, dispatch }, payload) {
      commit('beforeSubmit');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          const user = {
            id: res.user.uid,
            registeredMeetups: []
          };

          commit('setUser', user);
          dispatch('getMeetupsData');
          commit('setLoading', false);
          commit('clearError');
          localStorage.setItem('user', JSON.stringify(state.user));
          router.push({ name: 'meetups' });
        })
        .catch((err) => {
          console.log(err);
          commit('setLoading', false);
          commit('setError', err.message);
        });
    },
    submitLogin({ commit, state, dispatch }, payload) {
      commit('beforeSubmit');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          const user = {
            id: res.user.uid,
            registeredMeetups: []
          };
          commit('setUser', user);
          dispatch('getMeetupsData');
          commit('setLoading', false);
          commit('clearError');
          localStorage.setItem('user', JSON.stringify(state.user));
          router.push({ name: 'meetups' });
        })
        .catch((error) => {
          console.log(err);
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    logOut({ commit }) {
      localStorage.removeItem('user');
      commit('setUser', null);
      commit('setLoading', false);
      commit('setError', null);
      router.push({ name: 'login' });
    },
    createMeetup({ commit, state }, payload) {
      if (state.user) {
        commit('setLoading', true)
        commit('beforeSubmit');
        let imageName = payload.image.name;
        let ext = imageName.split('.')[1];
        let meetup = {
          title: payload.title,
          location: payload.location,
          description: payload.description,
          date: payload.date,
          time: payload.time,
          creator: state.user.id
        };
        let key;

        db.collection('meetups')
          .add(meetup)
          .then((res) => {
            key = res.id
            meetup.id = key
            return key;
          })
          .then(() => {
            return firebase
              .storage()
              .ref(`meetups/${key}.${ext}`)
              .put(payload.image);
          })
          .then((data) => {
            return data.ref.getDownloadURL();
          })
          .then(imgData => {
            meetup.imageUrl = imgData
            return db.collection('meetups').doc(key).update({ imageUrl: imgData })

          }).then(res => {
            console.log(meetup);
            commit('createMeetup', meetup);
            router.push({ name: 'meetups' });
            commit('setLoading', false);
          })
          .catch((err) => {
            console.log(err);
            commit('setLoading', false);
            commit('setError', err.message);
          });
      }
    },
    getMeetupsData({ state, commit }) {
      if (state.user) {
        commit('beforeSubmit');
        db.collection('meetups')
          .get()
          .then((data) => {
            data.forEach((item) => {
              let meetup = item.data();
              state.loadedMeetups.push({
                ...meetup,
                id: item.id
              });
            });
          })
          .catch((err) => {
            console.log(err);
            commit('setError', err.message);
          });
      }
    }
  }
});
