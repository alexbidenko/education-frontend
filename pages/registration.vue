<template>
  <v-form>
    <v-container fluid class="d-flex justify-center align-center flex-column">
      <v-row class="col-12">
        <v-col>
          <v-text-field :name="registration.name" label="Имя" />
        </v-col>
      </v-row>
      <v-row class="col-12">
        <v-col>
          <v-text-field :surname="registration.surname" label="Фамилия" />
        </v-col>
      </v-row>
      <v-row class="col-12">
        <v-col>
          <v-text-field
            :patronymic="registration.patronymic"
            label="Отчество"
          />
        </v-col>
      </v-row>
      <v-row class="col-12">
        <v-col>
          <v-select
            v-model="typeUserValue"
            :items="items"
            label="Тип пользователя ?"
          />
        </v-col>
      </v-row>
      <v-row class="col-12">
        <v-col>
          <v-text-field :email="registration.email" label="Email" />
        </v-col>
      </v-row>
      <v-row class="col-12">
        <v-col>
          <v-text-field :password="registration.password" label="Пароль" />
        </v-col>
      </v-row>
      <v-row class="col-12">
        <v-col>
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
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-between col-12">
        <v-btn color="primary" depressed to="/login">Войти</v-btn>

        ><v-btn depressed color="secondary" @click="registrationInfo"
          >Зарегистрироваться</v-btn
        >
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
      const {
        name,
        surname,
        email,
        password,
        typeUser,
        dateRegistration,
        patronymic,
      } = this.registration
      try {
        const response = await this.$axios.$post('', this.registration)
        if (
          name !== '' &&
          surname !== '' &&
          patronymic !== '' &&
          email !== '' &&
          typeUser !== '' &&
          email !== '' &&
          dateRegistration !== '' &&
          password !== ''
        ) {
          return null
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
