<template>
    <v-card width="400" class="ma-auto">
      <v-form @submit.prevent="userLogin">
        <v-card-title class="pb-5">
          <h1>Login</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="login.username"
            label="Username"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            v-model="login.password"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>

        <v-card-actions>
          <nuxt-link to="/register">
            <v-btn class="px-2 py-2" color="success">REGISTER</v-btn>
          </nuxt-link>
          <v-spacer></v-spacer>
          <v-btn color="info" type="submit">LOGIN</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: '',
        device_name: 'Dummy Device',
      },
      showPassword: false,
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
      console.log(this.$auth.user)
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
