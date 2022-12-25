import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router'

import UserList from '@/views/user/UserList.vue'
import RoleList from '@/views/role/RoleList/RoleList.vue'
import GroupUserList from '@/views/groupUser/GroupUserList.vue'
import ConnectList from '@/views/connect/ConnectList.vue'
//Router
//Định nghĩa router
const routers = [
    {path:"/user",component:UserList},
    {path:"/role",component:RoleList},
    {path:"/groupUser",component:GroupUserList},
    {path:"/connect",component:ConnectList},
]
//Khởi tạo router
const router = createRouter({
    history:createWebHistory(),
    routes:routers,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
//
// app.component("abc",abc);