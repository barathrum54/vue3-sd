import { createWebHistory, createRouter } from 'vue-router';
import routes from "./routes/routes";
import {requiredAuth} from "@/router/middlewares/auth.middleware";

const router = createRouter({
    history: createWebHistory(
        process.env.BASE_URL,
    ),
    linkExactActiveClass: 'active',
    routes,
});

router.beforeEach(requiredAuth);

export default router;
