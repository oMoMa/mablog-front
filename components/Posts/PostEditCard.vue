<template>
  <v-card width="500px" class="mx-auto my-10">
    <v-form
      v-model="valid"
      @submit.prevent="
        if (valid) {
          $emit('uploadPost', loadedPost)
        }
      "
      lazy-validation
    >
      <v-card-text>
        <v-text-field
          v-model="title"
          :rules="titleRules"
          :counter="50"
          placeholder="Title"
          label="Title"
          outlined
          required
        ></v-text-field>
        <v-textarea
          v-model="body"
          :rules="bodyRules"
          placeholder="Body"
          name="postBody"
          outlined
          label="Body"
          auto-grow
        ></v-textarea>
        <v-file-input
          accept="image/*"
          label="Cover"
          required
          v-model="thumbnail"
          :rules="fileRules"
        ></v-file-input>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn type="submit" color="info">{{
          editing ? 'Update' : 'Post'
        }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    loadedPost: {
      type: Object,
      required: true,
    },
    editing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length <= 50 || 'Title must be less than 50 characters',
      ],
      bodyRules: [
        (v) => !!v || 'Body is required',
        (v) => v.length >= 5 || 'Body must have at least 5 characters',
      ],
      fileRules: [(v) => !!v || !v],
    }
  },
  computed: {
    title: {
      get() {
        return this.loadedPost.attributes.title
      },
      set(value) {
        this.loadedPost.attributes.title = value
      },
    },
    body: {
      get() {
        return this.loadedPost.attributes.body
      },
      set(value) {
        this.loadedPost.attributes.body = value
      },
    },
    thumbnail: {
      get() {
        if (!!this.loadedPost.attributes.thumb_image)
          return this.loadedPost.attributes.thumb_image
        else return ''
      },
      set(value) {
        this.loadedPost.attributes.thumb_image = value
      },
    },
  },
}
</script>

<style></style>
