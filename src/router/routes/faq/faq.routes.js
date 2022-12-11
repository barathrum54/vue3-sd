export default [
  {
    name: "faq-layout",
    path: "/faq",
    components: {
      default: () => import("@/layout/admin/adminLayout.vue"),
    },
    children: [
      {
        path: "",
        name: "faq",
        component: () =>
          import(
            /* webpackChunkName: "Inbox" */ "@/views/faq/Faq.vue"
          ),
      },
    ],
    meta: {
      requiredAuth: true,
    },
  },
];
