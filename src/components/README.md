### Comonents Klasör Yapılandırması

> - Bu klasör altında *GENEL** component'ler yer almalıdır. Bu klasör altındaki component'ler hiçbir şekilde özel durum component'i olmamalıdır.
> > Örneğin, ```/buttons/button.vue``` burası için uygundur. Ancak ```/shopPostList.vue``` buraya uygun değildir.

- Bu klasör altındaki component'lerin tüm özellikleri dinamik olmalıdır.

### Yanlış Kullanım Örneği

```buttons/button.vue```
```vue
<template>
  <button class="btn btn-primary">hoş geldiniz</button>
</template>
```


### Doğru Kullanım Örneği

```buttons/button.vue```
```vue
<script setup>
defineProps({
  text: String,
  type: {
    type: String,
    validator: param => ["success", "info", "danger"].includes(param)
  },
  size: {
    type: String,
    validator: param => ["1", "2", "3"].includes(param)
  },
  textColor: String,
  bgColor: String,
})
</script>

<template>
  <button class="amp-button" :class="[`amp-button-size-${size}`, `amp-button-${type}`]">
    <slot>{{text}}</slot>
  </button>
</template>

<style lang="scss">
.amp-button {
  background-color: v-bind(textColor);
  color: v-bind(bgColor);
  &.amp-button-success {
    color: green;
   // ....
  }
}
</style>
```

Yapıyı anlamak için öğrenmeniz gerekenler:

- Vue Composition API
- Vue slot
- Vue style binding
- vue prop validation
- scss selector
