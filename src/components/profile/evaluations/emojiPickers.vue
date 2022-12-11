<template>
  <div ref="isEmojiPicker">
  </div>
</template>

<script>
import {Picker} from 'emoji-picker-element';
import tr from "emoji-picker-element/i18n/tr.js"

export default {

  name: "emojiPickers",
  emits: ["is-emoji-click"],
  data() {
    return {
      picker: new Picker({
        locale: 'tr',
        i18n: tr
      })
    }
  },
  mounted() {
    this.$refs.isEmojiPicker.append(this.picker)
    this.picker.addEventListener("emoji-click", (event) => this.$emit('is-emoji-click', event))
  }
}
</script>