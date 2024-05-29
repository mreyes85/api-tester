<script setup lang="ts">
const props = withDefaults(defineProps<{
    vertical?: boolean
    horizontal?: boolean
}>(), {
    vertical: true,
    horizontal: true,
})

const containerClasses = {
    'app-container-center': true,
    'app-container-center--vertical': props.vertical,
    'app-container-center--horizontal': props.horizontal,
}
</script>
<template>
    <div :class="containerClasses">
        <div class="app-container-center-wrapper">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.app-container-center {
    width: 100%;
    height: 100%;
}
.app-container-center--vertical {
    align-content: center;
}
.app-container-center--horizontal .app-container-center-wrapper {
    margin-inline: auto;
}
.app-container-center-wrapper {
    width: fit-content;
    height: fit-content;
}
</style>