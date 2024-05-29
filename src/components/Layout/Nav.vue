<script setup lang="ts">
const props = defineProps<{
    open?: boolean
    items?: any[]
    right?: boolean
    size?: 'default'|'compact'
}>()
const navigationClasses = computed(()=>({
    'app-nav': true,
    'app-nav--absolute': true,
    'app-nav--left': !props.right,
    'app-nav--right': props.right,
    [`app-nav--size-${props.size||'default'}`]: true,
    ['app-nav--open']: !!props.open,
    ['app-nav--close']: !props.open,
}))
</script>
<template>
    <nav :class="navigationClasses">
        <div class="app-nav--content">
            <slot name="prepend"></slot>
            <slot>
                <element-list v-if="items" :model-value="items" />
            </slot>
            <slot name="append"></slot>
        </div>
    </nav>
</template>

<style scoped>
.app-nav {
    -webkit-overflow-scrolling: touch;
    background: rgb(var(--app-theme-surface));
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 100%;
    pointer-events: auto;
    transition-duration: 0.2s;
    transition-property: box-shadow, transform, visibility, width, height, left, right, top, bottom;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    border-color: rgba(var(--app-border-color), var(--app-border-opacity));
    border-style: solid;
    border-width: 0;
    box-shadow: 0px 0px 0px 0px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
    background: rgb(var(--app-theme-surface));
    color: rgba(var(--app-theme-on-surface), var(--app-high-emphasis-opacity));
}
.app-nav--left {
    left: 0;
    right: auto;
    border-right-width: thin;
}
.app-nav--right {
    right: 0;
    left: auto;
    border-left-width: thin;
}
.app-header--density-default + .app-layout > .app-nav,
.app-header--density-default + .app-nav {
    --app-nav-w-header: var(--app-header-size-default);
}
.app-header--density-comfortable + .app-layout > .app-nav,
.app-header--density-comfortable + .app-nav {
    --app-nav-w-header: var(--app-header-size-confortable);
}
.app-header--density-compact + .app-layout > .app-nav,
.app-header--density-compact + .app-nav {
    --app-nav-w-header: var(--app-header-size-compact);
}
.app-nav--absolute {    
    z-index: 904;
    position: absolute;
    height: calc(100% - var(--app-nav-w-header, 0px));
    top: var(--app-nav-w-header, 0);
    bottom: 0;
}
.app-nav--size-compact {
    width: var(--app-nav-size-compact);
}
.app-nav--size-default {
    width: var(--app-nav-size-default);
}
.app-nav--open {
    transform: translateX(0px);
}
.app-nav--size-compact.app-nav--close {
    transform: translateX(calc(var(--app-nav-size-compact) * -1));
}
.app-nav--size-default.app-nav--close {
    transform: translateX(calc(var(--app-nav-size-default) * -1));
}
.app-nav--content {
    flex: 0 1 auto;
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.app-nav .app.list {
    overflow: hidden;
}
.app-list--nav {
    --indent-padding: -8px;
    padding-inline: 8px;
}
.app-list--nav > .app-list-item {
    padding-inline: 8px;
}
</style>