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
                    meta: {title: 'Profile'},
                    component: importComponent('dashboard/Profile'),
                },
                //Reservations
                {
                    path: "/reservations",
                    name: "Reservations",
                    meta: {title: 'Reservations'},
                    component: importComponent('dashboard/Reservations'),
                },
                //Hotels
                {
                    path: "/hotels",
                    name: "Hotels",
                    meta: {title: 'Hotels'},
                    component: importComponent('dashboard/Hotels'),
                },
                //Feasts
                {
                    path: "/feasts",
                    name: "Feasts",
                    meta: {title: 'Feasts'},
                    component: importComponent('dashboard/Feasts'),
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