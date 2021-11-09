<template>
  <v-form style="height: 100%; display: flex; align-items: center">
    <v-container>
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <v-text-field v-model="registration.name" outlined label="Имя" />
          <v-text-field
            v-model="registration.last_name"
            outlined
            label="Фамилия"
          />
          <v-text-field
            v-model="registration.patronimyc"
            outlined
            label="Отчество"
          />
          <!--          <v-select-->
          <!--            v-model="typeUserValue"-->
          <!--            :items="items"-->
          <!--            label="Тип пользователя ?"-->
          <!--            outlined-->
          <!--          />-->
          <v-text-field v-model="registration.email" outlined label="Email" />
          <v-text-field
            v-model="registration.password"
            outlined
            label="Пароль"
            type="password"
          />
          <v-text-field
            v-model="repeatPassword"
            outlined
            label="Повторите пароль"
            type="password"
          />
          <!--          <v-menu-->
          <!--            ref="menu"-->
          <!--            v-model="menu"-->
          <!--            :close-on-content-click="false"-->
          <!--            :return-value.sync="date"-->
          <!--            transition="scale-transition"-->
          <!--            offset-y-->
          <!--            min-width="auto"-->
          <!--          >-->
          <!--            <template #activator="{ on, attrs }">-->
          <!--              <v-text-field-->
          <!--                v-model="date"-->
          <!--                outlined-->
          <!--                label="Picker in menu"-->
          <!--                prepend-icon="mdi-calendar"-->
          <!--                readonly-->
          <!--                v-bind="attrs"-->
          <!--                v-on="on"-->
          <!--              />-->
          <!--            </template>-->
          <!--            <v-date-picker v-model="date" no-title scrollable>-->
          <!--              <v-spacer />-->
          <!--              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>-->
          <!--              <v-btn text color="primary" @click="$refs.menu.save(date)">-->
          <!--                OK-->
          <!--              </v-btn>-->
          <!--            </v-date-picker>-->
          <!--          </v-menu>-->
          <div class="d-flex justify-space-between">
            <v-btn
              depressed
              color="secondary"
              :disabled="!validation"
              @click="registrationInfo"
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
      repeatPassword: '',
      test: '',
      menu: false,
      typeUserValue: '',
      registration: {
        name: '',
        last_name: '',
        patronimyc: '',
        // typeUser: '',
        email: '',
        password: '',
        // dateRegistration: dateCalendar,
      },
    }
  },
  computed: {
    validation() {
      return (
        this.repeatPassword === this.registration.password &&
        this.registration.name &&
        this.registration.last_name &&
        this.registration.email &&
        this.registration.password.length >= 8
      )
    },
  },
  methods: {
    async registrationInfo() {
      try {
        if (this.validation) {
          const response = await this.$axios.$post(
            'write_user/',
            this.registration
          )

          this.$cookies.set('USER_ID', response.id)
          this.$cookies.set('USER_EMAIL', response.email)

          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
