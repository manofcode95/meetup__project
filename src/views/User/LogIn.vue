<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-layout wrap>
        <v-flex xs6 offset-xs3>
          <v-card class="pa-5">
            <v-layout column wrap>
              <v-flex xs12>
                <h2 class="text-uppercase display-2 mb-4">Log In</h2>
                <app-alert v-if="error" :text="error"/>
              </v-flex>
              <v-flex xs12 v-if="loading">
                <app-loading/>
              </v-flex>
              <v-flex xs12 v-else>
                <v-layout column wrap>
                  <v-flex xs12>
                    <v-text-field
                      required
                      label="Email"
                      type="email"
                      prepend-inner-icon="email"
                      v-model.trim="email"
                      @blur="$v.email.$touch()"
                      :class="{invalid:$v.email.$error}"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      required
                      label="Password"
                      type="password"
                      prepend-inner-icon="fingerprint"
                      v-model.trim="password"
                      @blur="$v.password.$touch()"
                      :class="{invalid:$v.password.$error}"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn flat class="primary" type="submit">Log In</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    password: {
      required
    },
    email: {
      required,
      email
    }
  },
  methods: {
    created() {
      this.$store.commit("afterLoadingPage");
    },
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("invalid submit");
      } else {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("submitLogin", user);
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
.invalid .v-input__slot::before {
  border-color: red !important;
}
</style>

