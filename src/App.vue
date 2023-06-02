<script lang="ts">
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: { FooterComponent, HeaderComponent },
};
</script>

<template>
  <v-app>
    <header-component />

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
