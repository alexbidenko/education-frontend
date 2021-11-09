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
                @start="
                  onStartCard(
                    column.cards[$event.oldIndex],
                    index,
                    $event.oldIndex
                  )
                "
                @end="onEndCard(index, $event.newIndex)"
              >
                <v-card
                  v-for="(card, subIndex) in column.cards"
                  :key="card.id"
                  class="mb-2 px-2"
                  color="accent"
                >
                  <v-card-title
                    v-if="!card.temp"
                    style="white-space: pre-wrap"
                    >{{ card.name }}</v-card-title
                  >
                  <template v-else>
                    <v-textarea
                      v-model="card.name"
                      auto-grow
                      rows="2"
                      placeholder="Содержание задачи"
                      @keydown.ctrl.enter="saveCard(index, subIndex)"
                    />
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="date1"
                          label="Дата начала"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date1"
                        @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="date2"
                          label="Дата конца"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date2"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-btn
                      style="width: 100%"
                      :disabled="card.name"
                      @click="saveCard(index, subIndex)"
                      >Сохранить</v-btn
                    >
                  </template>
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
    draggableCard: {
      card: null,
      cardIndex: 0,
      colIndex: 0,
    },
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
      .toISOString()
      .substr(0, 10),
    menu1: false,
    menu2: false,
  }),

  async fetch() {
    this.board = (
      await this.$axios.$get(
        'board/getboard/' + this.$route.params.projectId + '/'
      )
    ).columns
  },

  methods: {
    onStartCard(card, colIndex, cardIndex) {
      this.draggableCard = {
        card,
        cardIndex,
        colIndex,
      }
    },
    onEndCard(colIndex, cardIndex) {
      this.$axios.$post('board/switch/', {
        project_id: +this.$route.params.projectId,
        column_order: this.draggableCard.colIndex + 1,
        card_order: this.draggableCard.cardIndex + 1,
        column_next:
          this.board.findIndex((el) =>
            el.cards.find((card) => card.id === this.draggableCard.card.id)
          ) + 1,
        card_next: cardIndex + 1,
      })
      this.draggableCard = {
        card: null,
        cardIndex,
        colIndex,
      }
    },
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

      const date1 = new Date(this.date1)
      let date2 = new Date(this.date2)

      if (date2.getTime() < date1.getTime())
        date2 = new Date(date1.getTime() + 1000 * 60 * 60 * 24)

      this.$axios
        .$post('board/writecard/', {
          column_order: this.board[columnIndex].order,
          project_id: +this.$route.params.projectId,
          name: this.board[columnIndex].cards[index].name,
          description: this.board[columnIndex].cards[index].description,
          order: index + 1,
          date_start: Math.round(date1.getTime() / 1000),
          date_finish: Math.round(date2.getTime() / 1000) + 60 * 60 * 24,
        })
        .then((data) => {
          this.board[columnIndex].cards[index].id = data.Response.id
          this.disabled = false
        })
    },
  },
}
</script>
