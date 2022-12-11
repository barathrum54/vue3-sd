export default [
  {
    name: "orders-layout",
    path: "/orders",
    components: {
      default: () => import("@/layout/admin/adminLayout.vue"),
    },
    children: [
      {
        name: "orders-default",
        path: "",
        components: {
          default: () => import("@/views/orders/Orders.vue"),
        },
        children: [
          {
            path: "bought",
            name: "boughtOrders",
            components: {
              default: () => import("@/views/orders/overview/OrdersList.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },

          {
            path: "sold",
            name: "soldOrders",
            components: {
              default: () => import("@/views/orders/overview/OrdersList.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
        ],
        meta: {
          requiredAuth: true,
        },
      },
    ],
    meta: {
      requiredAuth: true,
    },
  },
];
