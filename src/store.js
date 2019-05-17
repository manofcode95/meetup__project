import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetupsList: [
      {
        name: "new york meetup",
        date: "May 26th, 2019",
        time: "12:30",
        message: "this is a new meetup",
        id: '1'
      },
      {
        name: "Tokyo meetup",
        date: "May 26th, 2019",
        time: "12:30",
        message: "this is a new meetup",
        id: '2'
      },
      {
        name: "Vietnam meetup",
        date: "May 26th, 2019",
        time: "12:30",
        message: "this is a new meetup",
        id: '3'
      }
    ]
  },
  getters: {
    meetups(state) {
      return state.meetupsList
    },
    loadedMeetup: (state) => (id) => {
      return state.meetupsList.find(meetup => meetup.id == id)
    }
  },
  mutations: {

  },
  actions: {

  }
})
