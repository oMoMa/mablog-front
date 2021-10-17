<template>
  <section>
    <v-app-bar color="white" flat>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <nuxt-link to="/">
        <v-app-bar-title class="text--no-wrap"> Mablog Front</v-app-bar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
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
              <img
                :src="this.$auth.user.profile_photo_url"
                alt="Profile Photo"
              />
            </v-avatar>
            <v-btn text @click="userLogout"> Logout </v-btn>
          </div>
        </div>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-text-field
        class="ma-2"
        dense
        flat
        hide-details
        rounded
        solo-inverted
        append-icon="mdi-magnify"
      ></v-text-field>
      <v-divider></v-divider>
      <v-expansion-panels v-if="this.$auth.loggedIn">
        <v-expansion-panel accordion>
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar class="mx-2">
                <img
                  :src="this.$auth.user.profile_photo_url"
                  alt="Profile Photo"
                />
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ this.$auth.user.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  this.$auth.user.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-expansion-panel-content>
              <v-list-item
                link
                @click="
                  drawer = false
                  userLogout()
                "
              >
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-expansion-panel-content>
          </v-list>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-list v-else>
        <v-list-item link to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
    }
  },
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

.v-app-bar-title__content {
  width: fit-content !important;
}
</style>
