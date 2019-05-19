<template>
  <v-layout wrap>
    <v-flex class="pa-3" xs12 sm6 lg4 v-for="(meetup, index) in meetups" :key="index">
      <Meetup :meetup="meetup"></Meetup>
    </v-flex>
  </v-layout>
</template>

<script>
import Meetup from "@/components/Meetup.vue";
export default {
  data() {
    return {};
  },
  components: {
    Meetup
  },
  computed: {
    meetups() {
      return this.$store.getters.meetups;
    }
  }
};
</script>

<style>
</style>
