<script setup lang="ts">
import Split, { type SplitInstance } from 'split-grid'

const grid = ref<ComponentPublicInstance<typeof HTMLDivElement>>()
const vGutter = ref<ComponentPublicInstance<typeof HTMLDivElement>>()
const splitter = ref<SplitInstance>()
watch([grid, vGutter], ([gridElement, gutterElement]) => {
    if(!gridElement||!gutterElement) return
    splitter.value = Split({
        columnGutters: [
            { track: 1, element: gutterElement.$el, }
        ],
    })
})
</script>

<template>
    <layout-grid ref="grid" class="app-api-container">
        <api-collections />
        <layout-grid-gutter direction="vertical" ref="vGutter" />
        <api-content />
    </layout-grid>
</template>

<style scoped>
.app-api-container {
    grid-template-columns: 368px 1px auto;
}
</style>