<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class="primary--text text-uppercase">{{ meetup.title }}</h2>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <EditMeetup :meetup="meetup"></EditMeetup>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px" contain left></v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date }} - {{ meetup.location }}</div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="text-uppercase primary" @click="register">register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import EditMeetup from "@/views/Meetup/EditMeetup";
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    loading() {
      return this.$store.getters.getLoading;
    },
    error() {
      return this.$store.getters.getError;
    },
    userIsCreator() {
      return this.$store.getters.isCreator(this.meetup.creator);
    }
  },
  methods: {
    register() {},
    onPickFile() {
      this.$refs.imgUpload.click();
    },
    onFilePicked(event) {
      const file = event.target.files[0];
      if (file) {
        const filename = file.name;
        if (filename.lastIndexOf(".") > 0) {
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            this.imageUrl = fileReader.result;
          });

          fileReader.readAsDataURL(file);
          this.image = file;
        } else {
          alert("Please add a valid image");
        }
      }
    }
  },
  components: {
    EditMeetup
  }
};
</script>

<style>
</style>
