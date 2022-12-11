
export default [
    {
        name: "auth-layout",
        path: "/auth",
        components: {
            default: () => import("@/layout/auth/authLayout.vue")
        },
        children: [
            {
                name: "auth-signin",
                path: "signin",
                components: {
                    default: () => import("@/views/auth/SignIn.vue")
                },
                meta: {
                    requiredAuth: false,
                    authPage: true
                }
            },
            {
                name: "auth-signup",
                path: "signup",
                components: {
                    default: () => import("@/views/auth/SignUp.vue")
                },
                meta: {
                    requiredAuth: false,
                    authPage: true
                }
            },
            {
                name: "auth-forgot-password",
                path: "forgotPassword",
                components: {
                    default: () => import("@/views/auth/ForgotPassword.vue")
                },
                meta: {
                    requiredAuth: false,
                    authPage: true
                }
            },
            {
                name: "auth-forgot-username",
                path: "forgotUsername",
                components: {
                    default: () => import("@/views/auth/ForgotUsername.vue")
                },
                meta: {
                    requiredAuth: false,
                    authPage: true
                }
            }
        ],
        meta: {
            requiredAuth: false,
            authPage: true
        }
    }
]