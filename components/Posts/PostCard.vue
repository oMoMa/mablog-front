<template>
  <v-card width="500px" class="mx-auto my-10">
    <v-img :src="thumbnail"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ body }}</v-card-text>
    <v-divider role="presentation"></v-divider>
    <v-card-actions>
      <v-button v-if="isAdmin"></v-button>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
    },
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
