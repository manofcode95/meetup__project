<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="meetup.imageUrl"></v-img>
    <v-card-text>
      <div>
        <h2 class="primary--text text-uppercase mb-4">{{meetup.title}}</h2>
        <span>
          <strong>Location:</strong>
          {{meetup.location}} |
        </span>
        <span>
          <strong>Date:</strong>
          {{meetup.date}} |
        </span>
        <span>
          <strong>Time:</strong>
          {{meetup.time}}
        </span>
        <p style="height:50px" class="mt-3">{{meetup.description | trim}}</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn depressed color="primary white--text mb-4" @click="viewMeetup">View</v-btn>
      <!-- <v-btn flat color="orange">Edit</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import EditMeetup from "@/views/Meetup/EditMeetup.vue";
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
