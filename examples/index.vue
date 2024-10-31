<script setup>
  import { defineProps, ref } from 'vue'
const props = defineProps({
  msg: String,
})
const count = ref(0)
</script>

<template lang='ts'>
     <h1>{{ msg }}</h1>
  <button>+</button>
</template>

