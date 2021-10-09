<template>
  <v-card width="500px" class="mx-auto my-10">
    <v-img :src="thumbnail"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ body }}
    </v-card-text>
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
