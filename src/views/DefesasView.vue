<script lang="ts">
export default {
  name: 'DefesasView',
  data() {
    return {
      itemsPerPage: 10,
      headers: null,
      items: null,
      customKeySort: {
        Data: (a, b) => this.compareDateStrings(a, b),
      },
      nomeFilter: '',
    };
  },
  methods: {
    async loadDefesas() {
      const url = 'http://thanos.icmc.usp.br:4567/api/v1/defesas';

      const response = await fetch(url);
      const data = await response.json();

      this.headers = this.formatHeaders(data.hs);
      // Embaralha valores (os dados já estão ordenados por data na api)
      this.items = data.items.sort(() => Math.random() - 0.5);
    },

    formatHeaders(headers) {
      // Remove a coluna "ordem" e retorna os atributos compatíveis com o componente v-data-table.
      return headers
        .filter((header) => header.text !== 'Ordem')
        .map((header) => ({
          title: header.text,
          key: header.text,
          sortable: true,
          width: header.text === 'Nome' ? '64%' : '12%',
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
  <v-container>
    <v-row>
      <v-col cols="6" hide-details>
        <v-text-field
          v-model="nomeFilter"
          label="Proucure pelo nome do aluno"
          single-line
          hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          v-if="headers && items"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="items"
          item-value="name"
          class="elevation-1"
          :search="nomeFilter"
          :custom-key-sort="customKeySort"
          density="comfortable"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
