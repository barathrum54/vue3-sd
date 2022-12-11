export default [
    {
        name: "profile-layout",
        path: "/profile",
        components: {
            default: () => import("@/layout/admin/adminLayout.vue"),
        },
        children: [
            {
                name: "user-profile",
                path: ":id",
                components: {
                    default: () => import("@/views/profile/userProfile.vue")
                },
                meta: {
                    name: "layout",
                    requiredAuth: true,
                },
                children : [
                    {
                        name:"user-profile-redirecter",
                        path:"",
                        redirect:  to => {
                            // the function receives the target route as the argument
                            // we return a redirect path/location here.
                            return `/profile/${to.params.id}/adverts`
                        },
                        meta:{
                            requiredAuth:true
                        }
                    },
                    {
                        name:"user-profile-adverts",
                        path:"adverts",
                        components:{
                            default : () => import("@/features/profile/pages/adverts")
                        },
                        meta:{
                            requiredAuth:true
                        }
                    },
                    {
                        name:"user-profile-summary",
                        path:"summary",
                        components:{
                            default : () => import("@/features/profile/pages/summary")
                        },
                        meta:{
                            requiredAuth:true
                        }
                    },
                    {
                        name:"user-profile-evaluations",
                        path:"evaluations",
                        components:{
                            default : () => import("@/features/profile/pages/evaluations")
                        },
                        meta:{
                            requiredAuth:true
                        }
                    }
                ]
            },

        ]
    }
]