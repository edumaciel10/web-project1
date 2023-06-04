<script lang="ts">
import type { DefesasType } from '@/utils/cursosType';

export default {
  name: 'DefesaView',
  data(): { Defesa: DefesasType } {
    return {
      Defesa: {
        Ordem: '0',
        Curso: '',
        Programa: '',
      },
    };
  },
  methods: {
    async loadDefesa(Ordem: Number | string | string[]) {
      const url = 'http://thanos.icmc.usp.br:4567/api/v1/defesas';

      const response = await fetch(url);
      const data = await response.json();
      const [selectedCurso] = data.items.filter(
        (item) => item.Ordem.toString() === Ordem.toString(),
      );

      console.log(selectedCurso);

      this.Defesa = selectedCurso;
    },
  },

  async beforeMount() {
    // get the id from the route
    await this.loadDefesa(this.$route.params.id);
  },
};
</script>

<template>
  <v-container min-width="100%" v-if="Defesa?.Ordem != '0' || Number(Defesa?.Ordem) > 0">
    <v-card min-width="100%">
      <v-card-title>
        <span class="headline">Nome: {{ Defesa.Nome }}</span>
      </v-card-title>
      <v-card-text>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Ordem: {{ Defesa.Ordem }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Data de nascimento: {{ Defesa.Data }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Curso: {{ Defesa.Curso }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Programa: {{ Defesa.Programa }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
    <v-btn color="blue" to="/defesas" min-width="100%">Voltar</v-btn>

  </v-container>
  <v-container v-else>
    <v-card>
      <v-skeleton-loader
        elevation="12"
        type="subtitle, list-item, list-item, list-item"
      />
    </v-card>
    <v-btn color="blue" to="/defesas" min-width="100%">Voltar</v-btn>
  </v-container>

</template>

<style>
.v-data-table__tr {
  cursor: pointer;
}
</style>
