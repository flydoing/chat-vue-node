import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/page/login'
import ChatGroup from '@/components/page/chatGroup'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/', name: 'Hello', component: Hello},
    {path: '/', redirect: '/login', name: 'Hello', component: Hello},
    {path: '/login', name: 'Login', component: Login},
    {path: '/chatGroup', name: 'ChatGroup', component: ChatGroup}
  ]
})
