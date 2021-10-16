import axios from 'axios'

export const state = () => {
  return {
    posts: [],
    recentPosts: [],
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
  addRecentPost(state, { id, index }) {
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id == id) {
        if (index == 0) {
          if (state.recentPosts.length > 0) {
            state.recentPosts.unshift({
              title: state.posts[i].attributes.title,
              id: id,
              link: `/posts/${id}`,
            })
          } else {
            state.recentPosts.push({
              title: state.posts[i].attributes.title,
              id: id,
              link: `/posts/${id}`,
            })
          }
        }
        if (state.recentPosts.length > 0) {
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
  nuxtServerInit(vuexContext, context) {
    return axios
      .get('http://127.0.0.1:8000/api/posts')
      .then((res) => {
        const postsArray = res.data.data
        vuexContext.commit('setPosts', postsArray)
      })
      .catch((e) => context.error(e))
  },
  setPosts(commit, posts) {
    commit('setPosts', posts)
  },
  addPost(commit, post) {
    commit('addPost', post)
  },
  editPost(commit, post) {
    commit('editPost', post)
  },
  deletePost(commit, id) {
    commit('deletePost', id)
  },
  addRecentPost({ commit, state }, id) {
    for (let i = 0; i < state.recentPosts.length; i++) {
      if (state.recentPosts[i].id == id) {
        commit('addRecentPost', { id, index: i })
        return
      }
      // no duplicate found and array is full 5
      if (i == 4) {
        commit('addRecentPost', { id, index: 4 })
      }
    }
    // No duplicate found and array size is less than 5
    commit('addRecentPost', { id, index: 0 })
  },
}

export const getters = {
  posts(state) {
    return state.posts
  },
  recentPosts(state) {
    return state.recentPosts
  },
}
