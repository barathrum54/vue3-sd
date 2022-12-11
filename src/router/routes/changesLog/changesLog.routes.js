export default [
    {
        name: "changesLog-layout",
        path: "/changesLog",
        components: {
            default: () => import("@/layout/admin/adminLayout.vue"),
        },
        children: [
            {
                name: "changes-log-main",
                path: "",
                components: {
                    default: () => import("@/views/changesLog/changesLog.vue")
                },
                meta: {
                    requiredAuth: true
                }
            },
        ]
    }
]