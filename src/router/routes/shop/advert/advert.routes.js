
export default [
    {
        name: "advert-dashboard",
        path: "adverts",
        components: {
            default: () => import("@/views/shop/adverts/dashboard.vue")
        },
        meta:{
            requiredAuth:true
        }
    }
]