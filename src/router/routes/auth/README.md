### ``Router/Auth`` Klasör Yapılandırması

Bu klasör altında giriş sayfaları için router yer almalıdır.

### Örnek kullanımı:

``shopAuth.router.js``
```javascript
export default [
    {
        path: "/auth",
        name: "auth-layout",
        components: {
            default: () => import("@/layouts/auth/authLayout.vue")
        },
        children: [
            // https://localhost:8080/auth olduğunda bu route çalışır.
            {
                path: "",
                name: "auth-layout-base",
                components: {
                    default: () => import("@/views/auth/login.vue")
                },
                meta: {
                    requiredAuth: false
                }
            },
            {
                path: "login",
                name: "auth-layout-base",
                components: {
                    default: () => import("@/views/auth/login.vue")
                },
                meta: {
                    requiredAuth: false
                }
            }
            // child rotalar burada
        ]
    }
]
```

Görüldüğü gibi, en base component bir layout'tur. Bu her tip için bu şekilde olmalıdır.
