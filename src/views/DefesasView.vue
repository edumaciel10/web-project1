<script lang="ts">
import type { DefesasType } from '@/utils/cursosType';

type DataType = {
  itemsPerPage: number;
  customKeySort: Object;
  nomeFilter: string;
  headers: String[];
  items: DefesasType[];
  filteredItems: DefesasType[];
  cursosFilterList: String[];
  cursosList: String[];
  programasFilterList: String[];
  programasList: String[];
  loading: boolean;
  loadingText: string;
};
export default {
  name: 'DefesasView',

  data(): DataType {
    return {
      itemsPerPage: 10,
      headers: [],
      items: [],
      filteredItems: [],
      customKeySort: {
        Data: (a, b) => this.compareDateStrings(a, b),
      },
      loading: true,
      loadingText: 'Carregando defesas...',
      nomeFilter: '',
      cursosFilterList: [],
      cursosList: [],
      programasFilterList: [],
      programasList: [],
    };
  },
  methods: {
    async loadDefesas() {
      const url = 'http://thanos.icmc.usp.br:4567/api/v1/defesas';

      const response = await fetch(url);
      const data = await response.json();

      if (!data.items) {
        this.loading = false;
        this.loadingText = 'Erro ao carregar defesas';
        return;
      }

      this.headers = this.formatHeaders(data.hs);

      // Embaralha valores (os dados já estão ordenados por data na api)
      // Pode causar má impressão na usabilidade
      this.items = data.items.sort(() => Math.random() - 0.5);
      this.filteredItems = this.items;

      // Obtém lista dos cursos (distinct).
      this.cursosList = this.items
        .map((item: { Curso: string }) => item.Curso)
        .filter((value, index, self): Boolean => self.indexOf(value) === index);

      // Obtém lista dos programas (distinct).
      this.programasList = this.items
        .map((item) => item.Programa)
        .filter((value, index, self) => self.indexOf(value) === index);

      // wait 2s
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.loading = false;
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

    compareDateStrings(a: string, b: string) {
      const [dayA, monthA, yearA] = a.split('/');
      const [dayB, monthB, yearB] = b.split('/');

      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

      return dateA.getTime() - dateB.getTime();
    },

    filterValue(value) {
      let matchCurso;
      let matchPrograma;

      // Se as listas com os filtros selecionados estão vazias, passa.
      // Se não, verifica se o curso e o programa do item estão nas listas com os filtros.
      if (this.cursosFilterList.length === 0) {
        matchCurso = true;
      } else {
        matchCurso = this.cursosFilterList.some((item) => item === value.Curso);
      }

      if (this.programasFilterList.length === 0) {
        matchPrograma = true;
      } else {
        matchPrograma = this.programasFilterList.some((item) => item === value.Programa);
      }

      return matchCurso && matchPrograma;
    },
    rowClick(item, { item: row }: { item: { raw: DefesasType } }) {
      const ordem = row.raw.Ordem;

      this.$router.push(`/defesas/${ordem}`);
    },
    updateFilters() {
      this.filteredItems = this.items.filter((item) => this.filterValue(item));
    },
  },
  mounted() {
    this.loading = true;
    this.loadingText = 'Carregando defesas...';
    this.loadDefesas();
  },
};
</script>

<template>
  <v-container v-if="headers && filteredItems">
    <v-row>
      <v-col cols="6" hide-details>
        <v-text-field v-model="nomeFilter" label="Nome" hide-details />
      </v-col>
      <v-col>
        <v-select
          clearable
          label="Curso"
          :items="cursosList"
          v-model="cursosFilterList"
          @update:model-value="updateFilters()"
          multiple
        />
      </v-col>
      <v-col>
        <v-select
          clearable
          label="Programa"
          :items="programasList"
          v-model="programasFilterList"
          @update:model-value="updateFilters()"
          multiple
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :loading="loading"
          :loading-text="loadingText"
          :on-click:row="rowClick"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="filteredItems"
          item-value="name"
          class="elevation-1"
          :search="nomeFilter"
          :custom-key-sort="customKeySort"
          density="comfortable"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="fill-height">
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <v-progress-circular class="" indeterminate :size="48" :width="6" color="var(--blue)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-data-table__tr {
  cursor: pointer;
}
</style>
