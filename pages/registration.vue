<template>
  <v-form style="height: 100%; display: flex; align-items: center">
    <v-container>
      <v-row class="py-12">
        <v-col cols="12" md="8" class="mx-auto">
          <h1 class="text-h4 mb-12">Присоединиться к нам</h1>
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
          <div class="d-flex justify-space-between">
            <v-btn
              color="primary"
              :disabled="!validation"
              :loading="isRequest"
              @click="registrationInfo"
              >Присоединиться</v-btn
            >
            <v-btn outlined to="/login">Войти</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Registration',
  layout: 'empty',
  data: () => {
    const dateCalendar = new Date().toISOString().substr(0, 10)
    return {
      isRequest: false,
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
        email: '',
        password: '',
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
          this.isRequest = true
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
      this.isRequest = false
    },
  },
}
</script>
