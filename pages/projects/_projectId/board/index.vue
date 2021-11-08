<template>
  <div style="overflow-x: auto; width: 100%; height: 100%">
    <div class="pa-4" style="display: flex; width: fit-content">
      <div
        v-for="(column, index) in board"
        :key="column.id"
        class="mr-4"
        style="width: 300px; flex: 0 0 300px"
      >
        <v-card>
          <v-text-field placeholder="Название колонки" />

          <v-divider />

          <div class="pa-1 pb-0">
            <v-card
              v-for="card in column.cards"
              :key="card.id"
              class="mb-2 px-2"
            >
              <v-text-field placeholder="Содержание задачи" />
            </v-card>
            <v-card>
              <v-btn style="width: 100%" @click="appendCard(index)"
                >Добавить</v-btn
              >
            </v-card>
          </div>
        </v-card>
      </div>
      <div style="width: 300px">
        <v-card>
          <v-btn style="width: 100%" @click="appendColumn">Добавить</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',

  data: () => ({
    board: [],
  }),

  methods: {
    appendColumn() {
      this.board.push({
        title: '',
        cards: [],
        id: Math.random(),
      })
    },
    appendCard(index) {
      this.board[index].cards.push({
        content: '',
        id: Math.random(),
      })
    },
  },
}
</script>
