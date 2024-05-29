<script setup lang="ts">
const navIcon = ref(true)
const navigations = [
  { prependIcon: 'mdi:aws', to: '/aws' }
]
</script>
<template>
    <layout-header title="Header" v-model:nav-icon="navIcon"/>
    <layout-nav :open="navIcon" size="compact" :items="navigations" />
    <layout-content>
        <RouterView />
    </layout-content>
    <layout-footer />
</template>
<style scoped>
</style>