<template>
  <v-dialog v-model="dialog" max-width="344">
    <template #activator="{ on, attrs }">
      <v-btn class="mt-2" v-bind="attrs" v-on="on">Отдай деньги падла</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline"
        >Заголовок для получения денег</v-card-title
      >
      <v-card-text>Описание денег</v-card-text>
      <v-card-actions>
        <v-text-field label="Деньги"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="pink" text @click="dialog = false"> Отправить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Popup',

  data: () => ({
    dialog: false,
  }),
}
</script>
