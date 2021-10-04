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
}

export const getters = {
  posts(state) {
    return state.posts
  },
}
