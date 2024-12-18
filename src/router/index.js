import VueRouter from 'vue-router'
import SideBar from '../page/SideBar'
import SpotMessage from '../page/SpotMessage'
import MyTest from '../page/MyTest'
import RouteIntroduce from '../page/RouteIntroduce'
import DataComment from '../page/DataComment'
import UniMessage from '../page/UniMessage'

const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/search'
        },
        {
            path:'/detail',
            component:UniMessage
        },
        {
            path:'/search',
            component:MyTest
        },
        {
            path:'/enter',
            component:SideBar,
            children:[
                {
                    path:'detail',
                    component:SpotMessage
                },
                {
                    path:'recommand',
                    component:RouteIntroduce
                },
                {
                    path:'comment',
                    component:DataComment
                }
            ]
        }
    ]
})
export default router