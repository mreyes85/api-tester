<script setup lang="ts">
const props = defineProps<{
    title?: string
    density?: 'default'|'comfortable'|'compact'
}>()
const navIcon = defineModel<boolean>('navIcon')
const layoutHeaderClasses = {
    'app-header': true,
    [`app-header--density-${props.density||'default'}`]: true,
}
</script>
<template>
    <header :class="layoutHeaderClasses">
        <div class="app-header-content">
            <slot name="prepend">
                <layout-nav-icon v-if="navIcon!==undefined" v-model="navIcon" />
            </slot>
            <slot>
                <div class="app-header-title">
                    <div class="app-header-title--wrapper">{{ title }}</div>
                </div>
            </slot>
            <slot name="append"></slot>
        </div>
    </header>
</template>
<style scoped>
.app-header {
    align-items: flex-start;
    display: flex;
    flex: none;
    flex-direction: column;
    justify-content: space-between;
    max-width: 100%;
    position: relative;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: height, width, transform, max-width, left, right, top, bottom, box-shadow;
    width: 100%;
    border-color: rgba(var(--app-border-color), var(--app-border-opacity));
    border-style: solid;
    border-width: 0;
    box-shadow: 0px 0px 0px 0px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
    border-radius: 0;
    background: rgb(var(--app-theme-surface-light));
    color: rgba(var(--app-theme-on-surface-light), var(--app-high-emphasis-opacity));
}
.app-header--density-default > .app-header-content {
    height: var(--app-header-size-default);
}
.app-header--density-comfortable > .app-header-content {
    height: var(--app-header-size-confortable);
}
.app-header--density-compact > .app-header-content {
    height: var(--app-header-size-compact);
}
.app-header-content, .app-header--extension {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    position: relative;
    transition: inherit;
    width: 100%;
}
.app-header-content {
    overflow: hidden;
}
.app-header-title {
    flex: 1 1;
    font-size: 1.25rem;
    min-width: 0;
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.75rem;
    text-transform: none;
}
.app-header-content > .app-header-title {
    margin-inline-start: 20px;
}
.app-header-title--wrapper{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>