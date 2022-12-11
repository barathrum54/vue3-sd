export default [
  {
    name: "settings-admin-layout",
    path: "/settings",
    components: {
      default: () => import("@/layout/admin/adminLayout.vue"),
    },
    children: [
      {
        name: "settings-base-layout",
        path: "",
        components: {
          default: () => import("@/views/settings/settings.vue"),
        },
        meta: {
          name: "layout",
          requiredAuth: true,
        },
        children: [
          {
            name: "settings-profile-infos",
            path: "profileInfos",
            components: {
              default: () =>
                import("@/views/settings/profileInfos/profileInfos.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
          {
            name: "settings-change-password",
            path: "changePassword",
            components: {
              default: () =>
                import("@/views/settings/changePassword/changePassword.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
          {
            name: "settings-change-mail",
            path: "changeMail",
            components: {
              default: () =>
                import("@/views/settings/changeMail/changeMail.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
          {
            name: "settings-change-phone-number",
            path: "changePhoneNumber",
            components: {
              default: () =>
                import(
                  "@/views/settings/changePhoneNumber/changePhoneNumber.vue"
                ),
            },
            meta: {
              requiredAuth: true,
            },
          },
          {
            name: "settings-change-account-security",
            path: "accountSecurity",
            components: {
              default: () =>
                import("@/views/settings/accountSecurity/accountSecurity.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
          {
            name: "settings-bank-accounts",
            path: "bankAccounts",
            components: {
              default: () =>
                import("@/views/settings/bankAccounts/bankAccounts.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
          {
            name: "settings-login-logs",
            path: "loginLogs",
            components: {
              default: () =>
                import("@/views/settings/loginLogs/loginLogs.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
          {
            name: "settings-balance-moves",
            path: "balanceMoves",
            components: {
              default: () =>
                import("@/views/settings/balanceMoves/balanceMoves.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },{
            name: "settings-invoices",
            path: "invoices",
            components: {
              default: () =>
                import("@/views/settings/invoices/invoices.vue"),
            },
            meta: {
              requiredAuth: true,
            },
          },
        ],
      },
    ],
  },
];
