export default [
    {
        name: "auth-home",
        path: "/",
        components: {
            default: () => import("../../../router/home.vue")
        },
        meta: {
            requiredAuth: true
        }
    }
]