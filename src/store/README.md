### Store Klasör Yapılandırması

Bu klasör altında pinia mağazaları yer almalıdır. VUEX vb. hiçbir mağaza bu projeye dahil edilmemelidir.

Pinia'yı bilmiyorsanız, pinia'nın dokümanını kesinlikle incelemelisiniz.

Örnek store Dosyası:

```javascript
import {defineStore} from "pinia";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        token: localStorage.getItem("auth:token") || ''
    }),
    getters: {
        getToken() {
            return this.token
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        }
    }
});
```
