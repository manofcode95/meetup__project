<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-layout wrap>
        <v-flex xs6 offset-xs3>
          <v-card class="pa-5">
            <v-layout column wrap>
              <v-flex xs12>
                <h2 class="text-uppercase display-2 mb-4">sign up</h2>
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
                    <dir
                      v-if="!$v.email.email & $v.email.$error"
                    >Please provide a valid email address</dir>
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
                    <div v-if="$v.password.$error">Password must have at least 5 characters</div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      required
                      label="Comfirm Password"
                      type="password"
                      prepend-inner-icon="fingerprint"
                      v-model="confirmPassword"
                      @blur="$v.confirmPassword.$touch()"
                      :class="{invalid:$v.confirmPassword.$error}"
                    ></v-text-field>
                    <div v-if="$v.confirmPassword.$error">Password isn't match!</div>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn flat class="primary" type="submit">Sign Up</v-btn>
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
  created() {
    this.$store.commit("afterLoadingPage");
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(5)
    },
    email: {
      required,
      email
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      if (this.$v.$invalid) {
        alert("invalid submit");
      } else {
        this.$store.dispatch("submitSignUp", user);
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    error() {
      return this.$store.getters.getError;
    },
    //Vuetify rule
    usernameRules() {
      let rules = [];

      const rule = v =>
        v.length >= 8 || "Username must have at least 8 characters";

      rules.push(rule);
      return rules;
    }
  }
};
</script>

<style>
.invalid .v-input__slot::before {
  border-color: red !important;
}
</style>

