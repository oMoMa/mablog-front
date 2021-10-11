<template>
  <v-app-bar color="white" flat>
    <nuxt-link to="/">
      <v-app-bar-title> Mablog Front</v-app-bar-title>
    </nuxt-link>
    <v-spacer></v-spacer>

    <v-responsive max-width="260">
      <v-text-field
        dense
        flat
        hide-details
        rounded
        solo-inverted
        append-icon="mdi-magnify"
      ></v-text-field>
    </v-responsive>
    <div id="avatar">
      <v-btn v-if="!this.$auth.loggedIn" to="/login" text> Login </v-btn>

      <div v-else>
        <v-avatar color="grey darken-1" size="32">
          <img :src="this.$auth.user.profile_photo_url" alt="Profile Photo" />
        </v-avatar>
        <v-btn text @click="userLogout"> Logout </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    async userLogout() {
      try {
        let response = await this.$auth.logout('local')
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>

<style>
a {
  text-decoration: none;
}
#avatar {
  margin-left: 20px;
}
</style>
