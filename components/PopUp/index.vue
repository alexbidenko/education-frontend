<template>
  <v-dialog v-model="dialog" max-width="344">
    <template #activator="{ on, attrs }">
      <v-btn class="mt-2" v-bind="attrs" style="width: 100%" v-on="on"
        >Вложиться в проект</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="headline">Инвестирование</v-card-title>
      <v-card-text>
        {{ stage.description }}
      </v-card-text>
      <v-card-text>
        <v-text-field v-model="summ" label="Сумма" type="number" />
        <v-text-field v-model="description" label="Комментарий" />
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">Отмена</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="primary" :loading="isRequest" @click="invest"
          >Инвестировать</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PopUp',

  props: {
    stage: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    isRequest: false,
    description: '',
    summ: '',
  }),

  methods: {
    invest() {
      this.isRequest = true
      this.$axios
        .$post('write_money/', {
          name: this.description,
          description: '',
          sum: this.summ,
          user: this.$store.state.UserModule.user.id,
          stage: this.stage.id,
        })
        .then(() => {
          this.description = ''
          this.summ = ''
          this.dialog = false
          this.$emit('update')
        })
        .finally(() => {
          this.isRequest = false
        })
    },
  },
}
</script>
