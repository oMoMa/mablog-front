<template>
  <section>
    <PostPreviewCard
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.attributes.title"
      :body="post.attributes.body"
      :thumbnail="'http://127.0.0.1:8000' + post.attributes.thumb_image"
      @clicked="$emit('showPostDialog', post)"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    },
  },
  methods: {},
  mounted() {},
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
