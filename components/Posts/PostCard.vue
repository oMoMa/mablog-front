<template>
  <v-card width="500px" class="mx-auto">
    <v-img v-if="thumbnail" :src="thumbnail"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ body }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn-toggle group>
        <v-btn class="red--text" v-if="$auth.loggedIn"
          ><v-icon>mdi-heart</v-icon>Favorite</v-btn
        >
      </v-btn-toggle>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
}
</script>

<style scoped></style>
