<template>
  <v-layout column wrap>
    <v-flex xs12>
      <h1 class="text-uppercase">{{meetup.name}}</h1>
    </v-flex>
    <v-flex xs12>
      <p>{{meetup.date}}</p>
    </v-flex>

    <v-flex xs12>
      <p>{{meetup.time}}</p>
    </v-flex>
    <v-flex xs12>
      <p>{{meetup.message}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    }
  }
};
</script>

<style>
</style>
