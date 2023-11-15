import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopRankView from '../views/TopRankView.vue'
import ChannelView from '../views/ChannelView.vue'
import ListenListView from '../views/ListenListView.vue'
import SearchResView from '../views/SearchResView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/top',
    component: TopRankView,

    // children: [
    //   {
    //     path: '',
    //     name: 'topRankContent',
    //     component: TopRankContentView,
    //     props: true,
    //   }
    // ],
  },
  {
    path: '/channel',
    name: 'channel',
    component: ChannelView,
  },
  {
    path: '/ting/remen',
    name: 'ting',
    component: ListenListView,
  },
  {
    path: '/search/:searchVal',
    name: 'searchRes',
    component: SearchResView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
