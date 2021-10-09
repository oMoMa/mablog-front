<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="3">
          <Sidebar />
        </v-col>

        <v-col>
          <PostList />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  methods: {},
  mounted() {},
}
</script>
