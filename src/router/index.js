import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login/Login.vue';
import Msite from '../pages/MSite/MSite.vue';
import Order from '../pages/Order/Order.vue';
import Order2 from '../pages/Order2/Order2.vue';
import Profile from '../pages/Profile/Profile.vue';
import Search from '../pages/Search/Search.vue';
import Bdata from '../pages/Bdata/Bdata.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/msite',
    component: Msite
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta:{
      needLogin: true
    }
  },
  {
    path: '/order2',
    name: 'order2',
    component: Order2
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      needLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/bdata',
    component: Bdata
  },
  {
    path: '/',
    redirect: '/msite'
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin) {
    //页面是否登录
    if (localStorage.getItem("token")) {
      //本地存储中是否有token(uid)数据
      next(); //表示已经登录
    } else {
      alert('账号未登录')
      // next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "login"
      });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});


export default router
