<template>
  <section>
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :id="parseInt(post.id)"
      :is-admin="isAdmin"
      :title="post.attributes.title"
      :body="post.attributes.body"
      :thumbnail="'http://127.0.0.1:8000' + post.attributes.thumb_image"
    />
  </section>
</template>

<script>
import PostCard from '@/components/Posts/PostCard'

export default {
  components: {
    PostCard,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
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
