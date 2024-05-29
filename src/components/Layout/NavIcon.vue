<script setup lang="ts">
const opened = defineModel<boolean>({ required: true })
</script>
<template>
    <element-button class="app-nav-icon" :icon="opened ? 'mdi:menu' : 'mdi:menu-close'" @click="opened = !opened" variant="plain" />
</template>