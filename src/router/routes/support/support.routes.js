export default [
    {
        name: "support-admin-layout",
        path: "/supports",
        components: {
            default: () => import("@/layout/admin/adminLayout.vue"),
        },
        children: [
            {
                name: "support-system-main",
                path: "",
                components: {
                    default: () => import("@/views/support/supportSystem.vue")
                },
                meta: {
                    requiredAuth: true
                }
            },
            {
                name: "support-system-detail",
                path: "detail/:id",
                components: {
                    default: () => import("@/views/support/detail/supportSystemDetail.vue")
                },
                meta: {
                    requiredAuth: true
                }
            },
        ]
    }
]