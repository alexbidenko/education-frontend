<template>
  <div v-dragscroll style="overflow-x: auto; width: 100%; height: 100%">
    <div class="pa-4" style="display: flex; width: fit-content">
      <draggable
        :list="board"
        :animation="200"
        ghost-class="ghost-card"
        group="columns"
        style="display: flex"
      >
        <div
          v-for="(column, index) in board"
          :key="column.id"
          class="mr-4"
          style="width: 300px; flex: 0 0 300px"
        >
          <v-card @mousemove.stop @mousedown.stop>
            <v-text-field
              v-if="column.temp"
              v-model="column.name"
              placeholder="Название колонки"
              @keydown.enter="saveColumn(index)"
            />
            <v-card-title v-else>{{ column.name }}</v-card-title>

            <v-divider />

            <div class="pa-1 pb-0">
              <draggable
                :list="column.cards"
                :animation="200"
                ghost-class="ghost-card"
                group="cards"
                style="min-height: 20px"
              >
                <v-card
                  v-for="(card, subIndex) in column.cards"
                  :key="card.id"
                  class="mb-2 px-2"
                >
                  <v-text-field
                    v-if="card.temp"
                    v-model="card.name"
                    placeholder="Содержание задачи"
                    @keydown.enter="saveCard(index, subIndex)"
                  />
                  <v-card-title v-else>{{ card.name }}</v-card-title>
                </v-card>
              </draggable>
              <v-card>
                <v-btn
                  style="width: 100%"
                  :disabled="disabled"
                  @click="appendCard(index)"
                  >Добавить</v-btn
                >
              </v-card>
            </div>
          </v-card>
        </div>
      </draggable>
      <div style="width: 300px">
        <v-card>
          <v-btn style="width: 100%" :disabled="disabled" @click="appendColumn"
            >Добавить</v-btn
          >
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Index',

  components: {
    draggable,
  },

  data: () => ({
    board: [],
    disabled: false,
  }),

  async fetch() {
    this.board = (
      await this.$axios.$get(
        'board/getboard/' + this.$route.params.projectId + '/'
      )
    ).columns
  },

  methods: {
    appendColumn() {
      this.board.push({
        name: '',
        cards: [],
        id: Math.random(),
        temp: true,
      })
      this.disabled = true
    },
    saveColumn(index) {
      this.board[index].temp = false

      this.$axios
        .$post('board/writecolumn/', {
          project_id: +this.$route.params.projectId,
          name: this.board[index].name,
          order: index + 1,
        })
        .then(() => {
          this.board[index].order = index + 1
          this.disabled = false
        })
    },
    appendCard(index) {
      this.board[index].cards.push({
        name: '',
        description: '',
        id: Math.random(),
        temp: true,
      })
      this.disabled = true
    },
    saveCard(columnIndex, index) {
      this.board[columnIndex].cards[index].temp = false

      this.$axios
        .$post('board/writecard/', {
          column_order: this.board[columnIndex].order,
          project_id: +this.$route.params.projectId,
          name: this.board[columnIndex].cards[index].name,
          description: this.board[columnIndex].cards[index].description,
          order: index + 1,
        })
        .then((data) => {
          this.board[columnIndex].cards[index].id = data.Response.id
          this.disabled = false
        })
    },
  },
}
</script>
