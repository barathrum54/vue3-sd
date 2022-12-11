import { useAuthStore } from "@/store/auth/auth.store";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user/user.store.js";

const requiredAuth = (to, form, next) => {
  const userStore = useUserStore();
  const { userType } = storeToRefs(userStore);
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if ((to.meta.requiredAuth && !isAuthenticated.value) || (to.fullPath ==="/" && !isAuthenticated.value))
    return next("/auth/signin");
  else if ((to.meta.authPage && isAuthenticated.value)||(to.fullPath ==="/" && isAuthenticated.value)) 
    return next(`/${userType.value}`);
   else return next();
  //return next();
};

export { requiredAuth };
