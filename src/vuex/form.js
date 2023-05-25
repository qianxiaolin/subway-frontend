export default {
    state:{
        route:'推荐线路',
        city: '无锡',
        start:"",
        end:'',
        map:null,
        search:false
    },
    mutations: {
      onFormUpdate(state,value) {
          if(state.city!=value.city){state.city=value.city}
          if(state.route!=value.route){state.route=value.route}
          if(state.start!=value.start){state.start=value.start}
          if(state.end!=value.end){state.end=value.end}
          if(state.map!=value.map){state.map=value.map}
          if(state.search!=value.search){state.search=value.search}
      }
    },

}