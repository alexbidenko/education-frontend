<template>
  <v-form>
    <v-container
      cols="12"
      sm="12"
      md="12"
      class="d-flex justify-center align-center flex-column"
    >
      <v-row>
        <v-col>
          <v-text-field
            :email="login.email"
            label="Email"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :password="login.password"
            label="Пароль"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn depressed color="primary" @click="userLogin">Войти</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    login: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async userLogin() {
      const { email, password } = this.login
      try {
        const response = await this.$axios.$post('', this.login)
        if (email !== '' && password !== '') {
          return null
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
