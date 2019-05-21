<template>
  <v-layout wrap>
    <v-flex xs8 offset-xs2>
      <v-card class="pa-5">
        <v-form @submit.prevent="onSubmit" ref="meetupForm">
          <v-layout wrap row>
            <v-flex xs12 class="mb-5">
              <h2 class="text-uppercase display-1">Create new meetup</h2>
              <app-alert v-if="error"></app-alert>
            </v-flex>
            <v-flex xs12 v-if="loading">
              <app-loading></app-loading>
            </v-flex>
            <v-flex xs12 v-else>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    v-model="title"
                    prepend-inner-icon="subject"
                    :rules="rules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Location"
                    v-model="location"
                    prepend-inner-icon="location_on"
                    :rules="rules"
                  ></v-text-field>
                </v-flex>
                <!-- <v-flex xs12>
                  <v-text-field
                    label="Image Url"
                    v-model="imageUrl"
                    prepend-inner-icon="link"
                    :rules="rules"
                  ></v-text-field>
                  <v-img contain max-height="300" :src="imageUrl"></v-img>
                </v-flex>-->

                <v-flex xs12>
                  <v-textarea
                    label="Description"
                    v-model="description"
                    prepend-inner-icon="message"
                    :rules="rules"
                  ></v-textarea>
                </v-flex>
                <v-flex xs6>
                  <v-date-picker height="150" reactive v-model="date" :rules="rules"></v-date-picker>
                </v-flex>
                <v-flex xs6>
                  <v-time-picker format="24hr" v-model="time" :rules="rules" class="display-3"></v-time-picker>
                </v-flex>
                <v-flex xs12>
                  <v-btn flat @click="onPickFile" class="primary">Upload Image</v-btn>
                  <input
                    type="file"
                    accept="image/*"
                    style="display:none"
                    ref="imgUpload"
                    @change="onFilePicked"
                  >
                </v-flex>
                <v-flex xs12>
                  <v-img max-height="300" contain :src="imageUrl"></v-img>
                </v-flex>
                <v-flex xs12>
                  <v-btn flat class="primary mt-3" type="submit">Create</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import { close } from "fs";

export default {
  data() {
    return {
      title: "meetup",
      location: "VN",
      imageUrl: "",
      description: "sss",
      date: new Date().toISOString().substr(0, 10),
      time: null,
      image: null,
      rules: [v => v.length > 0 || "Field can not be empty"]
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.meetupForm.validate()) {
        const meetup = {
          title: this.title,
          location: this.location,
          description: this.description,
          date: this.date,
          time: this.time,
          image: this.image
        };
        this.$store.dispatch("createMeetup", meetup);
      }
    },
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
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    error() {
      return this.$store.getters.getError;
    }
  }
};
</script>

<style>
.v-time-picker-title__time .v-picker__title__btn,
.v-time-picker-title__time span {
  height: 50px;
}

.v-picker--date .v-picker__body {
  padding: 4px 0;
}
</style>
