<script setup lang="ts">
import Split, { type SplitInstance } from 'split-grid'

const splitter = ref<SplitInstance>()
const grid = ref<HTMLDivElement>()
const childs = ref<Element[]>()

function setGridSizes () {
    if (!grid.value) return
    const GLUTTER_SIZE = ' 5px '
    if (props.columns) {
        let columnsSizes = ''
        for (let index=0; index<props.columns; index++) {
            const size = (props.columnSizes) ? props.columnSizes[index] : (1 / (props.columns || 1))
            columnsSizes += ((isString(size)) ? size : `${size}fr`) + GLUTTER_SIZE
        }
        columnsSizes = columnsSizes.substring(0, columnsSizes.length - GLUTTER_SIZE.length)
        grid.value.style.gridTemplateColumns = columnsSizes
    }

    if (props.rows) {
        let rowsSizes = ''
        for (let index=0; index<props.rows; index++) {
            const size = (props.rowSizes) ? props.rowSizes[index] : (1 / (props.rows || 1))
            rowsSizes += ((isString(size)) ? size : `${size}fr`) + GLUTTER_SIZE
        }
        rowsSizes = rowsSizes.substring(0, rowsSizes.length - GLUTTER_SIZE.length)
        grid.value.style.gridTemplateRows = rowsSizes
    }
}
watch(grid, (v) => {
    debugger
    if(!v) return
    childs.value = Array.from(v.children)
    const columns = childs.value.filter((child) => child?.className.includes('vertical-gutter'))
    const rows = childs.value.filter((child) => child?.className.includes('horizontal-gutter'))
    const splitterOpts = Object.assign({},
        (columns?.length && {
            columnGutters: columns.map((element, index) => ({
                track: index + 1,
                element: element,
            }))
        }),
        (rows?.length && { 
            rowGutters: rows.map((element, index) => ({
                track: index + 1,
                element: element,
            }))
        }),
    )
    if(!hasValues(splitterOpts)) return
    splitter.value = Split(splitterOpts)
    setGridSizes()
})
</script>

<template>
    <div class="grid" ref="grid">
        <slot />
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: .3fr 5px .3fr;
    grid-template-rows: .3fr 5px .3fr;
    height: 100vh;
    overflow: hidden;
}
</style>