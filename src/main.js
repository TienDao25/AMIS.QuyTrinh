import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router'

import UserList from '@/views/setting/user/UserList.vue'
import RoleList from '@/views/setting/role/RoleList/RoleList.vue'
import GroupUserList from '@/views/setting/groupUser/GroupUserList.vue'
import ConnectList from '@/views/setting/connect/ConnectList.vue'
//Router
//Định nghĩa router
const routers = [
    {path:"/setting/user",component:UserList},
    {path:"/setting/role",component:RoleList},
    {path:"/setting/groupUser",component:GroupUserList},
    {path:"/setting/connect",component:ConnectList},
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