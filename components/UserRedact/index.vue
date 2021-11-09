<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ on, attrs }">
      <v-btn style="width: 100%" v-bind="attrs" v-on="on">Редактировать</v-btn>
    </template>
    <v-form v-if="model" @submit.prevent="update">
      <v-card>
        <v-toolbar color="primary" dark>Редактирование данных</v-toolbar>
        <v-card-text>
          <v-text-field v-model="model.name" placeholder="Имя" />
          <v-text-field v-model="model.last_name" placeholder="Фамилия" />
          <v-text-field v-model="model.patronimyc" placeholder="Отчество" />
          <v-text-field v-model="model.email" placeholder="Email" />
          <v-text-field
            v-model="model.organization"
            placeholder="Организация"
          />
          <v-textarea v-model="model.contacts" rows="2" auto-grow />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Отменить</v-btn>
          <v-btn color="primary" text type="submit">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'UserRedact',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      model: {
        name: this.user.name,
        last_name: this.user.last_name,
        patronimyc: this.user.patronimyc,
        email: this.user.email,
        organization: this.user.organization,
        contacts: this.user.contacts,
      },
    }
  },

  watch: {
    user() {
      this.model = { ...this.user }
    },
  },

  methods: {
    update() {
      this.$axios
        .$post('/update_user/', {
          id: this.user.id,
          ...this.model,
        })
        .then(() => {
          this.dialog = false
          this.$emit('update')
        })
    },
  },
}
</script>
