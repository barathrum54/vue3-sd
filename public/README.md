### Public Klasör Yapılandırması

Bu klasör altında png, jpg, jpeg türündeki statik görseller yer almalıdır. Vue component'lerinden import edilerek kullanılmamalıdır!

### Yanlış Kullanım Örneği

```vue
<template>
  <img src="require('@/assets/images/blabla')">
</template>
```

### Doğru Kullanım Örneği

```vue
<template>
  <img src="/images/blabla">
</template>
```

Bunun sebebi component'in yüklenme hızını arttırmaktır. Aksi takdirde component her import edildiğinde resimi çektiği için performans kaybı kaçınılmaz olacaktır.
