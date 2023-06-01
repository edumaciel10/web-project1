<script lang="ts">
export default {
  name: 'DefesasView',
  data() {
    return {
      itemsPerPage: 10,
      headers: undefined,
      items: undefined,
    };
  },
  methods: {
    async loadDefesas() {
      const url = 'http://thanos.icmc.usp.br:4567/api/v1/defesas';
      const response = await fetch(url);
      const data = await response.json();
      const { headers, items } = this.formatData(data);
      this.headers = headers;
      this.items = items;
    },
    formatData(data) {
      return {
        headers: this.formatHeaders(data.hs),
        items: this.formatItems(data.items),
      };
    },
    formatHeaders(headers) {
      return headers.filter((header) => header.text !== 'Ordem').map((header) => ({
        title: header.text,
        key: header.text.toLowerCase(),
        sortable: true,
      }));
    },
    formatItems(items) {
      return items.map((item) => ({
        curso: item.Curso,
        programa: item.Programa,
        nome: item.Nome,
        data: item.Data,
      }));
    },
  },
  beforeMount() {
    this.loadDefesas();
  },
};
</script>

<template>
  <v-data-table
    v-if="headers && items"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="items"
    item-value="name"
    class="elevation-1"
  />
</template>
