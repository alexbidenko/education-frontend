<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <v-text-field outlined :name="registration.name" label="Имя" />
          <v-text-field
            outlined
            :surname="registration.surname"
            label="Фамилия"
          />
          <v-text-field
            outlined
            :patronymic="registration.patronymic"
            label="Отчество"
          />
          <v-select
            v-model="typeUserValue"
            :items="items"
            label="Тип пользователя ?"
            outlined
          />
          <v-text-field outlined :email="registration.email" label="Email" />
          <v-text-field
            outlined
            :password="registration.password"
            label="Пароль"
          />
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                outlined
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer />
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <div class="d-flex justify-space-between">
            <v-btn depressed color="secondary" @click="registrationInfo"
              >Зарегистрироваться</v-btn
            >
            <v-btn color="primary" depressed to="/login">Войти</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Registration',
  data: () => {
    const dateCalendar = new Date().toISOString().substr(0, 10)
    return {
      date: dateCalendar,
      items: [
        'Обучающийся',
        'Представитель учебного заведения',
        'Представитель ИТ компании',
      ],
      test: '',
      menu: false,
      typeUserValue: '',
      registration: {
        name: '',
        surname: '',
        patronymic: '',
        typeUser: '',
        email: '',
        password: '',
        dateRegistration: dateCalendar,
      },
    }
  },
  methods: {
    async registrationInfo() {
      try {
        if (Object.values(this.registration).some((el) => !el)) {
          const response = await this.$axios.$post(
            'write_user/',
            this.registration
          )
          this.$cookies.set('TOKEN', response.token)
          this.$axios.defaults.headers.Authorization = `Bearer ${response.token}`
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
