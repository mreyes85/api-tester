<script setup lang="ts">
import { RouteLocationRaw } from 'unplugin-vue-router';

const props = defineProps<{
    density?: 'compact'|'default'|'comfortable'
    rounded?: boolean|0|'xs'|'sm'|'xl'|'lg'
    elevation?: 4|8|12|16|20|24|"4"|"8"|"12"|"16"|"20"|"24"
    flat?: boolean
    variant?: 'plain'|'text'|'outlined'|'tonal'|'flat'|'elevated'
    disabled?: boolean
    link?: boolean
    to?: RouteLocationRaw
    replace?: boolean
    color?: string
}>()

const NO_BG_VARIANTS = ['outlined', 'text', 'plain']
const variant = props.variant||(props.flat ? 'flat' : 'elevated')
const cardClasses = {
    'app-card': true,
    [`app-card--density-${props.density||'default'}`]: true,
    [`app-card--variant-${variant}`]: true,
    [`elevation-${props.elevation}`]: !!props.elevation,
    'app-card--disabled': !!props.disabled,
    'app-card--link': !!props.link||!!props.to,
    'app-card--rounded': !!props.rounded,
    [`rounded-${props.rounded===false ? 0 : props.rounded}`]: props.rounded!==true&&!!props.rounded,
    [`bg-${props.color}`]: (!NO_BG_VARIANTS.includes(variant)),
    [`text-${props.color}`]: (NO_BG_VARIANTS.includes(variant)),
}
</script>

<template>
    <div :class="cardClasses">
        <div class="app-card--loader"></div>
        <slot></slot>
        <span class="app-card--underlay"></span>
    </div>
</template>

<style scoped>
.app-card {
    display: block;
    overflow: hidden;
    overflow-wrap: break-word;
    position: relative;
    padding: 0;
    text-decoration: none;
    transition-duration: 0.28s;
    transition-property: box-shadow, opacity, background;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    border-color: rgba(var(--app-border-color), var(--app-border-opacity));
    border-style: solid;
    border-width: 0;
    border-radius: 4px;
}
.app-card--variant-elevated, .app-card--variant-flat {
    background: rgb(var(--app-theme-surface));
    color: rgba(var(--app-theme-on-surface), var(--app-high-emphasis-opacity));
}
.app-card--variant-elevated {
    box-shadow: 0px 2px 1px -1px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.app-card--variant-flat {
    box-shadow: 0px 0px 0px 0px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.app-card--variant-plain, .app-card--variant-outlined, .app-card--variant-text, .app-card--variant-tonal {
    background: transparent;
    color: inherit;
}
.app-card--variant-outlined {
    border: thin solid currentColor;
}
.app-card--variant-plain {
    opacity: 0.62;
}
.app-card .app-card--underlay {
    position: absolute;
}
.app-card--link {
    cursor: pointer;
}
.app-card--loader {
    bottom: auto;
    top: 0;
    left: 0;
    position: absolute;
    right: 0;
    width: 100%;
    z-index: 1;
}
.app-card--disabled {
    pointer-events: none;
    user-select: none;
}
.app-card--disabled > :not(.app-card--loader) {
    opacity: 0.6;
}
</style>