<script lang="ts">
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: { FooterComponent },
};
</script>

<template>
  <v-app>
    <v-app-bar color="var(--blue)"> ICMC </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <footer-component />
  </v-app>
</template>

<style>
  :root {
    --blue: rgb(10, 44, 87);
  }
</style>
