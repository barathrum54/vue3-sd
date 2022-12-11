import {mask} from "vue-the-mask";

export const InputMask = {
    mounted: (el, binding) => {
        if (!binding.value) return;
        return mask(el, binding);
    }
}