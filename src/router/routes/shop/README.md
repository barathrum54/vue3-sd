### Services Klasör Yapılandırması

Tüm API isteklerinin yürütüleceği kısım bu klasör ve bu klasör altındaki dosyalardır.

- Hiçbir şekilde bir component doğrudan API'ye istek atmamalıdır.
- Tüm API fonksiyonları camelCase şekilde yazılmalıdır.

Örnek kullanım:

```javascript
const https = useHttps();

export const getData = async() => {
    const response = await https.post("/enpoint");
    return {
        page: response.page,
        list: response.data
    }
}
```
