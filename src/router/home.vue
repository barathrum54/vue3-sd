<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user/user.store.js";
import { useAuthStore } from "@/store/auth/auth.store";
const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const userStore = useUserStore();
const { userType } = storeToRefs(userStore);
onMounted(() => {
  console.log("Home mounted");
  if (userType.value && isAuthenticated.value) {
    router.push(`/${userType.value}`);
    console.log(isAuthenticated.value)
    return;
  }
  router.push({ name: "auth-signin" });
});
</script>