<script setup lang="ts">
const props = defineProps<{
    direction: 'vertical'|'horizontal'
}>()

const gutterClasses = {
    [`${props.direction}-gutter`]: true
}
</script>

<template>
    <div :class="gutterClasses" ref="gutter" />
</template>

<style scoped>
.vertical-gutter, .horizontal-gutter{
    background-color: rgba(var(--app-theme-on-background), var(--app-medium-emphasis-opacity));
}
.vertical-gutter {
    grid-area: 1 / 2 / 4 / 2;
    cursor: col-resize;
}
.horizontal-gutter {
    grid-area: 2 / 1 / 2 / 4;
    cursor: row-resize;
}
</style>