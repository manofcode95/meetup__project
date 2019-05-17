<template>
  <v-card>
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    ></v-img>
    <v-card-title>
      <div>
        <p class="grey--text">{{meetup.name}}</p>
        <p>{{meetup.time}}-{{meetup.date}}</p>
        <p>{{meetup.message}}</p>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange" @click="viewMeetup">View</v-btn>
      <v-btn flat color="orange">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["meetup"],
  methods: {
    viewMeetup() {
      this.$router.push({
        name: "meetup",
        params: { id: `${this.meetup.id}` }
      });
    }
  }
};
</script>

<style>
</style>
