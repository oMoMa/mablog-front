export default function ({ $auth, $axios, params, redirect }) {
  $axios
    .get(`/api/posts/${params.id}`)
    .then((res) => {
      if (!(res.data.data.relationships.owner.data.id == $auth.user.id)) {
        return redirect('/')
      }
    })
    .catch((e) => {
      console.error(e)
    })
}
