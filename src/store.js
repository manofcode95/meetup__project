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
    meetupsList: [
      {
        name: 'new york meetup',
        date: 'May 26th, 2019',
        time: '12:30',
        message: 'this is a new meetup',
        id: '23'
      },
      {
        name: 'Tokyo meetup',
        date: 'May 26th, 2019',
        time: '12:30',
        message: 'this is a new meetup',
        id: '2'
      },
      {
        name: 'Vietnam meetup',
        date: 'May 26th, 2019',
        time: '12:30',
        message: 'this is a new meetup',
        id: '3'
      }
    ]
  },
  getters: {
    meetups(state) {
      if (state.user.registeredMeetups) {
        return state.user.registeredMeetups.sort((meetupA, meetupB) => {
          return meetupA.date < meetupB.date;
        });
      }
    },
    loadedMeetup: (state) => (id) => {
      if (state.user) {
        return state.user.registeredMeetups.find((meetup) => meetup.id == id);
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
    }
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
    setMeetupsList(state, payload) {
      state.user.registeredMeetups = payload;
    },
    beforeSubmit(state) {
      (state.error = null), (state.loading = true);
    },
    afterLoadingPage(state) {
      (state.error = null), (state.loading = false);
    },
    createMeetup(state, payload) {
      state.user.registeredMeetups.push(payload);
    }
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
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
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
        console.log(4);
        db.collection('meetups')
          .add(meetup)
          .then((res) => {
            commit('createMeetup', { ...meetup, id: res.id });
            return res.id;
          })
          .then((key) => {
            return firebase
              .storage()
              .ref(`meetups/${key}.${ext}`)
              .put(payload.image);
          })
          .then((res) => {
            router.push({ name: 'meetups' });
            commit('setLoading', false);
          })
          .catch((err) => {
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
            let meetupsList = [];
            data.forEach((item) => {
              let meetup = item.data();
              meetupsList.push({
                ...meetup,
                id: item.id
              });
            });
            commit('setMeetupsList', meetupsList);
          })
          .catch((err) => {
            commit('setError', err.message);
          });
      }
    }
  }
});
