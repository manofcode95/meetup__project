<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" max-width="800" min-width="300" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on" depressed>Edit</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Edit Meetup</v-card-title>

        <v-card-text>
          <v-form @submit.prevent="onSubmit" ref="meetupForm">
            <v-layout wrap row>
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
                  <v-divider></v-divider>
                  <v-flex xs12 class="mt-5">
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn depressed color="primary mt-3 " right type="submit">Edit</v-btn>
                    <v-btn depressed color="warning mt-3 " right @click="dialog=false">Close</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      title: this.meetup.title,
      location: this.meetup.location,
      imageUrl: this.meetup.imageUrl,
      description: this.meetup.description,
      date: this.meetup.date,
      time: this.meetup.time,
      image: null,
      rules: [v => v.length > 0 || "Field can not be empty"]
    };
  },
  methods: {
    submitEdit() {
      dialog = false;
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
