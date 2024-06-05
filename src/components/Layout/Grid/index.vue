<script setup lang="ts">
</script>

<template>
    <div class="app-grid">
        <slot />
    </div>
</template>

<style scoped>
.app-grid {
    display: grid;
    height: 100vh;
    overflow: hidden;
}
</style>