export default [
  {
    name: "notification-layout",
    path: "/notifications",
    components: {
      default: () => import("@/layout/admin/adminLayout.vue"),
    },
    children: [
      {
        name: "notifications-default",
        path: "",
        components: {
          default: () => import("@/views/notifications/Notifications.vue"),
        },
        children: [
          {
            path: "",
            name: "allNotifications",
            component: () =>
              import(
                /* webpackChunkName: "Inbox" */ "@/views/notifications/overview/AllNotifications.vue"
              ),
          },
          {
            path: "unread",
            name: "unRead",
            component: () =>
              import(
                /* webpackChunkName: "Inbox" */ "@/views/notifications/overview/AllNotifications.vue"

              ),
          },
          {
            path: "awaitingAction",
            name: "awaitingAction",
            component: () =>
              import(
                /* webpackChunkName: "Inbox" */ "@/views/notifications/overview/AllNotifications.vue"

              ),
          },
          {
            path: "systemNotifications",
            name: "systemNotifications",
            component: () =>
              import(
                /* webpackChunkName: "Inbox" */ "@/views/notifications/overview/AllNotifications.vue"

              ),
          },
          {
            path: "/notifications/:id",
            name: "NotificationsDetailView",
            component: () =>
              import(
                /* webpackChunkName: "singleMail" */ "@/views/notifications/overview/NotificationsDetailView.vue"
              ),
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
