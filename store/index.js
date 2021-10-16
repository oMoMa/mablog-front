import axios from 'axios'

export const state = () => {
  return {
    posts: [],
    recentPosts: [],
    pagination: {},
  }
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setPagination(state, pagination) {
    state.pagination = pagination
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
  addRecentPost(state, { id, index }) {
    for (let i = 0; i < state.posts.length; i++) {
      // Find the post
      if (state.posts[i].id == id) {
        // No duplications found
        if (index == 5) {
          if (state.recentPosts.length < 5) {
            state.recentPosts.splice(index, 1)
            state.recentPosts.unshift({
              title: state.posts[i].attributes.title,
              id: id,
              link: `/posts/${id}`,
            })
          } else {
            state.recentPosts.unshift({
              title: state.posts[i].attributes.title,
              id: id,
              link: `/posts/${id}`,
            })
            state.recentPosts.pop()
          }
        } else {
          state.recentPosts.splice(index, 1)
          state.recentPosts.unshift({
            title: state.posts[i].attributes.title,
            id: id,
            link: `/posts/${id}`,
          })
        }
      }
    }
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('updatePage', 1)
  },
  setPagination({ commit }, pagination) {
    commit('setPagination', pagination)
  },
  updatePage({ commit }, nextPage) {
    const PER_PAGE = 5
    axios
      .get(
        `http://127.0.0.1:8000/api/posts?per_page=${PER_PAGE}&page=${nextPage}`,
        {
          headers: {
            'User-Agent': 'PostmanRuntime/7.28.4',
            Accept: 'application/json',
          },
        }
      )
      .then((res) => {
        commit('setPosts', res.data.data)
        commit('setPagination', res.data.meta)
      })
      .catch((e) => console.error(e))
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  setPosts({ commit }, posts) {
    commit('setPosts', posts)
  },
  addPost({ commit }, post) {
    commit('addPost', post)
  },
  editPost({ commit }, post) {
    commit('editPost', post)
  },
  deletePost({ commit }, id) {
    commit('deletePost', id)
  },
  addRecentPost({ commit, state }, id) {
    for (let i = 0; i < state.recentPosts.length; i++) {
      if (state.recentPosts[i].id == id) {
        commit('addRecentPost', { id, index: i })
        return
      }
    }
    // No duplicate found
    commit('addRecentPost', { id, index: 5 })
  },
}

export const getters = {
  posts(state) {
    return state.posts
  },
  recentPosts(state) {
    return state.recentPosts
  },
  pagination(state) {
    return state.pagination
  },
}
