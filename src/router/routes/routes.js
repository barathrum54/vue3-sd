import authRoutes from "@/router/routes/auth/auth.routes";
import homeRoutes from "@/router/routes/home/home.routes";
import shopRoutes from "@/router/routes/shop/shop.routes";
import notificationsRoutes from "@/router/routes/notifications/notifications.routes.js";
import orders from "@/router/routes/orders/orders.routes.js";
import settingsRoutes from "@/router/routes/settings/settings.routes";
import supportRoutes from "@/router/routes/support/support.routes";
import chatRoutes from "@/router/routes/chat/chat.routes";
import faqRoutes from "@/router/routes/faq/faq.routes";
import profileRoutes from "@/router/routes/profile/profile.routes";
import changesLogRoutes from "./changesLog/changesLog.routes";


export default [
    ...authRoutes,
    ...shopRoutes,
    ...homeRoutes,
    ...notificationsRoutes,
    ...orders,
    ...settingsRoutes,
    ...supportRoutes,
    ...chatRoutes,
    ...faqRoutes,
    ...profileRoutes,
    ...changesLogRoutes
]