<template>
  <v-card width="400" class="ma-auto">
    <v-form @submit.prevent="userSignup">
      <v-card-title class="pb-5">
        <h1>Register</h1>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="signup.name" label="Name" />
        <v-text-field v-model="signup.username" label="Username" />
        <v-text-field v-model="signup.phone" label="Phone" />
        <v-text-field
          :rules="emailRules"
          v-model="signup.email"
          label="Email"
        />

        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          v-model="signup.password"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
        <v-text-field
          :type="showConfirmPassword ? 'text' : 'password'"
          :rules="passwordConfirm"
          v-model="signup.password_confirmation"
          label="Confirm Password"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
        />
      </v-card-text>

      <v-card-actions>
        <nuxt-link to="/">
          <v-btn color="success">CANCEL</v-btn>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">SIGNUP</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      signup: {
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      showPassword: false,
      showConfirmPassword: false,
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
      passwordRules: [(v) => v.length == 8 || 'Password must be 8 characters'],
      passwordConfirm: [
        (v) => v === this.signup.password || 'Passwords do not match',
      ],
    }
  },
  methods: {
    async userSignup() {
      try {
        let response = await this.$axios.post('/api/user/register', this.signup)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
      console.log(this.$auth.user)
    },
  },
}
</script>
