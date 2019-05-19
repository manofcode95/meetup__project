<template>
  <v-alert dismissible type="error" :value="true" @input="onClose">{{text}}</v-alert>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$store.commit("clearError");
    }
  }
};
</script>

<style>
</style>
