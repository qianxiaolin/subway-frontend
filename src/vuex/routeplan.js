export default {
  state: {
    route: [],
    // key:0
  },
  mutations: {
    onListRoute(state, value) {
      // state.city=value
      var array_route = []
      console.log(value)
      value.forEach((x) => {
        array_route.push({
          content: x, size: 'large', type: 'primary',hollow: true,})
      }
      )
      console.log(array_route)
      state.route = array_route
    }
  },

}