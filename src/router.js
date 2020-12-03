import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/dashboard",
            name: "NavBar",
            component: importComponent('dashboard/NavBar'),
            children: [
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    meta: {title: 'PAWRes「ダッシュボード」'},
                    component: importComponent('dashboard/Dashboard'),
                },
                //Profile
                {
                    path: "/profile",
                    name: "Profile",
                    meta: {title: 'PAWRes「プロフィル」'},
                    component: importComponent('dashboard/Profile'),
                },
                //Reservations
                {
                    path: "/reservations",
                    name: "Reservations",
                    meta: {title: 'PAWRes「ホテルのご予約」'},
                    component: importComponent('dashboard/Reservations'),
                },
                //Hotels
                {
                    path: "/hotels",
                    name: "Hotels",
                    meta: {title: 'PAWRes「ホテル管理」'},
                    component: importComponent('dashboard/Hotels'),
                },
                //Feasts
                {
                    path: "/feasts",
                    name: "Feasts",
                    meta: {title: 'PAWRes「ご馳走管理」'},
                    component: importComponent('dashboard/Feasts'),
                },
                {
                    path: "/useradmin",
                    name: "Users",
                    meta: {title: 'PAWRes「ユーザー管理」'},
                    component: importComponent('dashboard/UserAdmin'),
                },
            ]
        },
        {
            path: "/index",
            component: importComponent('CircleBar'),
            children: [
                //Index
                {
                    path: "/index",
                    name: "index",
                    meta: {title: 'PAWRes「ホーム」'},
                    component: importComponent('index'),
                },
                //Login
                {
                    path: "/login",
                    name: "login",
                    meta: {title: 'PAWRes「ログイン」'},
                    component: importComponent('login'),
                },
                //Signup
                {
                    path: "/signup",
                    name: "signup",
                    meta: {title: 'PAWRes「サインアップ」'},
                    component: importComponent('signup'),
                },
            ]
        },
        {
            path: '*',
            redirect: '/index',
            meta: {title: 'PAWRes「ホーム」'},
            component: importComponent('index'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router;