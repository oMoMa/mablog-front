<template>
  <!-- <NuxtLink :to="postLink"> -->
  <v-card width="500px" class="mx-auto my-10" @click="$emit('clicked')">
    <v-img :src="thumbnail"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <!-- computed property based on length -->
      {{ postBody }}
    </v-card-text>
  </v-card>
  <!-- </NuxtLink> -->
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
    },
    id: {
      type: String,
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
  computed: {
    postBody() {
      return this.body.length <= 200
        ? this.body
        : this.body.slice(0, 197) + '...'
    },
    postLink() {
      return '/posts/' + this.id
    },
  },
}
</script>

<style scoped></style>
