import advertRoutes from "@/router/routes/shop/advert/advert.routes";

export default [
    {
        name: "shop-layout",
        path: "/shop",
        components: {
            default: () => import("@/layout/admin/adminLayout.vue")
        },
        children: [
            ...advertRoutes,
            {
                name: "shop-default-dashboard",
                path: "",
                components: {
                    default: () => import("@/views/shop/dashboard.vue")
                },
                meta: {
                    requiredAuth: true
                }
            }
            
        ],
        meta: {
            requiredAuth: true
        }
    }
]