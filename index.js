import { createRouter, createWebHistory } from "vue-router";
import Register from "@/components/auth/Register.vue";
import Login from "@/components/auth/Login.vue";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";
import Dashboard from "@/components/admin/Dashboard.vue";
import Account from "@/components/admin/Account.vue";
import Logout from "@/components/admin/Logout.vue";
import Movies from "@/components/admin/Movie/Movies.vue";
import Finance from "@/components/admin/Finance/Finance.vue";
import Transactions from "@/components/admin/Transactions.vue";
import user from "@/components/admin/user.vue";
import setting from "@/components/admin/Setting.vue";
import GenreManager from "@/components/admin/Movie/GenreManager.vue";

const routes = [{
    path: "/register",
    name: "register",
    component: Register
},
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/forgotpassword",
        name: "forgotpassword",
        component : ForgotPassword
    },
    {
        path: "/admin",
        name: "dasboard",
        component: Dashboard
    },
    {
        path: "/admin/movies",
        name: "movies",
        component: Movies
    },
    {
        path: "/admin/account",
        name: "account",
        component: Account
    },
    {
        path: "/admin/finance",
        name: "finance",
        component: Finance
    },
    {
        path: "/admin/transactions",
        name: "transactions",
        component: Transactions
    },
    {
        path: "/admin/logout",
        name: "logout",
        component: Logout
    },
    {
        path: "/admin/user",
        name: "user",
        component: user
    },
    {
        path: "/admin/setting",
        name: "setting",
        component: setting
    },
    {
        path: "/admin/genremanager",
        name: "genremanager",
        component: GenreManager
    },
    
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
