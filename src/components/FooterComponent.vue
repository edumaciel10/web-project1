<script lang="ts">
export default {
  name: 'FooterComponent',
};
</script>

<template>
  <v-footer color="var(--blue)" height="1" class="FooterComponent">
    <v-container fluid>
      <v-row>
        <v-col>
          <p class="text-center text-white">SSC0961 - Desenvolvimento Web e Mobile - 2023.1</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.FooterComponent {
  max-height: 100px;
}
</style>
