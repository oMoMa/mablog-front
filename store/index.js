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
      .get('/posts')
      .then((res) => {
        const postsArray = []
        for (const key in res.data) {
          postsArray.push(res.data[key])
        }
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
