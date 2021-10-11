<template>
  <v-main class="grey lighten-3">
    <PostCard
      :id="parseInt(post.id)"
      :title="post.attributes.title"
      :body="post.attributes.body"
      :thumbnail="'http://127.0.0.1:8000' + post.attributes.thumb_image"
      :ownerID="parseInt(post.relationships.owner.data.id)"
    />
  </v-main>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$axios
      .$get('/api/posts/' + context.params.id)
      .then((res) => {
        return {
          post: res.data,
        }
      })
      .catch((e) => context.error(e))
  },
}
</script>

<style></style>
