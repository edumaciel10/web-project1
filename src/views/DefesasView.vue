<script lang="ts">
export default {
  name: 'DefesasView',
  data() {
    return {
      itemsPerPage: 10,
      headers: undefined,
      items: undefined,
      customKeySort: {
        data: (a, b) => this.compareDateStrings(a, b),
      },
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
      const formatedHeaders = headers.filter((header) => header.text !== 'Ordem').map((header) => ({
        title: header.text,
        key: header.text.toLowerCase(),
        sortable: true,
      }));

      const [dateHeader] = formatedHeaders.filter((header) => header.key === 'data');
      dateHeader.sort = (a, b) => this.compareDateStrings(a, b);

      return formatedHeaders;
    },

    formatItems(items) {
      return items.map((item) => ({
        curso: item.Curso,
        programa: item.Programa,
        nome: item.Nome,
        data: item.Data,
      }));
    },

    compareDateStrings(a, b) {
      const [dayA, monthA, yearA] = a.split('/');
      const [dayB, monthB, yearB] = b.split('/');

      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

      return dateA.getTime() - dateB.getTime();
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
    :custom-key-sort="customKeySort"
  />
</template>
