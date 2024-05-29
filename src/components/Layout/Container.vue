<script setup lang="ts">
</script>
<template>
    <div class="app-layout">
        <slot />
    </div>
</template>
<style scoped>
.app-layout {
  --app-scrollbar-offset: 0px;
  display: flex;
  flex: 1 1 auto;
  z-index: 900;
  position: relative;
  overflow: hidden;
}
</style>