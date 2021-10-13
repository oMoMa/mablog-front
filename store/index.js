import axios from 'axios'

export const state = () => {
  return {
    posts: [],
  }
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  addPost(state, post) {
    state.posts.unshift(post)
  },
  editPost(state, post) {
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id == post.id) {
        state.posts[i] = post
      }
    }
  },
  deletePost(state, postId) {
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id == postId) {
        state.posts.splice(i, 1)
      }
    }
  },
}

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get('http://127.0.0.1:8000/api/posts')
      .then((res) => {
        const postsArray = res.data.data
        vuexContext.commit('setPosts', postsArray)
      })
      .catch((e) => context.error(e))
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
  },
  addPost(vuexContext, post) {
    vuexContext.commit('addPost', post)
  },
  editPost(vuexContext, post) {
    vuexContext.commit('editPost', post)
  },
  deletePost(vuexContext, id) {
    vuexContext.commit('deletePost', id)
  },
}

export const getters = {
  posts(state) {
    return state.posts
  },
}
