<script lang="ts">
export default {
  name: 'HeaderComponent',
};
</script>

<template>
  <v-app-bar color="var(--blue)">
    <v-row>
      <v-col class="d-flex align-center">
        <v-img src="/logo.png" alt="logo icmc" width="107" height="48" align="center" />
      </v-col>

      <v-col cols="7">
        <v-tabs centered color="white">
          <v-tab to="/" class="text-white"> Home </v-tab>
          <v-tab to="/defesas" class="text-white"> Defesas </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
