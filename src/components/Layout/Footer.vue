<script setup lang="ts">
const props = defineProps<{
    border?: boolean|0|'xs'|'sm'|'xl'|'lg'
}>()
const footerClasses = {
    'app-footer--border': !!props.border,
    [`border-${props.border===false ? 0 : props.border}`]: props.border!==true&&!!props.border,
    
}
const name = import.meta.env.APP_NAME
</script>

<template>
    <footer class="app-footer" :class="footerClasses">
        <slot>
            <div class="text-center w-100">
                {{ new Date().getFullYear() }} - <strong>{{ name }}</strong>
            </div>
        </slot>
    </footer>
</template>

<style scoped>
.app-footer {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    padding: 8px 16px;
    position: relative;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: height, width, transform, max-width, left, right, top, bottom;
    border-color: rgba(var(--app-border-color), var(--app-border-opacity));
    border-style: solid;
    border-width: 0;
    box-shadow: 0px 0px 0px 0px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
    border-radius: 0;
    background: rgb(var(--app-theme-surface));
    color: rgba(var(--app-theme-on-surface), var(--app-high-emphasis-opacity));
}
.app-footer--border {
    border-width: thin;
    box-shadow: none;
}
</style>