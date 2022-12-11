<template>
 <component 
   :is="'a-'+_type" active :class="'is-'+_type"> 

 </component>
</template>

<script setup>
import {computed} from 'vue';
const props=defineProps({
    height:Number,
    type:{
        type:String,
        default:"",
        validator:((param)=>['avatar','title','paragraph','input'].includes(param))
    },
    width:Number,
})
const _type=computed(()=>props.type===''?'skeleton':'skeleton-'+props.type)
</script>   
<style lang="scss">
.is-skeleton-title>span{
    height: v-bind(height);
    width: v-bind(width)
}
.is-skeleton-input>.ant-skeleton-input{
    height: v-bind(height);
    width: v-bind(width);
}
.is-skeleton>.ant-skeleton-content>h3{
    height: v-bind(height);
    width: v-bind(width);
}
</style>