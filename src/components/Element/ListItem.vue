<script setup lang="ts">
import { RouteLocationRaw } from 'unplugin-vue-router';

const props = defineProps<{
    title?: string
    subtitle?: string
    prependIcon?: string
    appendIcon?: string
    density?: 'default'|'compact'
    lines?: 'one'|'two'|'three'
    rounded?: boolean|0|'xs'|'sm'|'xl'|'lg'
    sharped?: boolean
    disabled?: boolean
    link?: boolean
    to?: RouteLocationRaw
    replace?: boolean
}>()
const itemClasses = {
    'app-list-item': true,
    [`app-list-item--density-${props.density||'default'}`]: true,
    [`app-list-item--${props.lines||'one'}-line`]: true,
    'app-list-item--rounded': !!props.rounded,
    [`rounded-${props.rounded===false ? 0 : props.rounded}`]: props.rounded!==true&&!!props.rounded,
    ['rounded-sharped']: !!props.sharped,
    'app-list-item--disabled': !!props.disabled,
    'app-list-item--link': !!props.link||!!props.to
}

const router = useRouter()
function handleClick() {
    if (props.to) (!props.replace) ? router.push(props.to) : router.replace(props.to)    
}
</script>

<template>
    <li :class="itemClasses" @click="handleClick">
        <span class="app-list-item--overlay" />
        <span class="app-list-item--underlay" />
        <div class="app-list-item--content" data-no-activator>
            <slot name="prepend">
                <element-icon v-if="prependIcon" :icon="prependIcon" />
            </slot>
            <slot>
                <div v-if="title" class="app-list-item--title">{{title}}</div>
                <div v-if="subtitle" class="app-list-item--subtitle">{{subtitle}}</div>
            </slot>
            <slot name="append">
                <element-icon v-if="appendIcon" :icon="appendIcon"/>
            </slot>
        </div>
    </li>
</template>

<style scoped>
.app-list-item {
    align-items: center;
    display: grid;
    flex: none;
    grid-template-areas: "prepend content append";
    grid-template-columns: max-content 1fr auto;
    outline: none;
    max-width: 100%;
    padding: 4px 16px;
    position: relative;
    text-decoration: none;
    border-color: rgba(var(--app-border-color), var(--app-border-opacity));
    border-style: solid;
    border-width: 0;
    border-radius: 0;
}
.app-list-item--link {
    cursor: pointer;
}
.app-list-item--variant-plain, .app-list-item--variant-outlined, .app-list-item--variant-text, .app-list-item--variant-tonal {
    background: transparent;
    color: inherit;
}
.app-list-item--variant-plain {
    opacity: 0.62;
}
.app-list-item--rounded {
    border-radius: 4px;
}
.app-list-item--link {
    cursor: pointer;
}
.app-list-item--disabled {
    pointer-events: none;
    user-select: none;
    opacity: 0.6;
}
.app-list-item--density-default {
    min-height: 40px;
}
.app-list-item--density-compact {
    min-height: 32px;
}
.app-list-item--density-default.app-list-item--three-line {
    min-height: 88px;
    padding-top: 16px;
    padding-bottom: 16px;
}
.app-list-item--density-default.app-list-item--two-line {
    min-height: 64px;
    padding-top: 12px;
    padding-bottom: 12px;
}
.app-list-item--density-default.app-list-item--one-line {
    min-height: 48px;
    padding-top: 4px;
    padding-bottom: 4px;
}
.app-list-item--density-compact.app-list-item--three-line {
    min-height: 80px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.app-list-item--density-compact.app-list-item--two-line {
    min-height: 56px;
    padding-top: 4px;
    padding-bottom: 4px;
}
.app-list-item--density-compact.app-list-item--one-line {
    min-height: 40px;
}
.app-list .app-list-item--nav:not(:only-child) {
    margin-bottom: 4px;
}
.app-list-item--overlay {
    background-color: currentColor;
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s ease-in-out;
}
.app-list-item--variant-text .app-list-item--overlay {
    background: currentColor;
}
.app-list-item:hover > .app-list-item--overlay {
    opacity: calc(var(--app-hover-opacity)* var(--app-theme-overlay-multiplier));
}
.app-list-item--underlay {
    position: absolute;
}
.app-list-item .app-list-item--underlay {
    position: absolute;
}
.app-list-item--content {
    align-self: center;
    grid-area: content;
    overflow: hidden;
}
.app-list-item--title {
    hyphens: auto;
    overflow-wrap: normal;
    overflow: hidden;
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
    word-wrap: break-word;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.009375em;
    line-height: 1.5;
    text-transform: none;
}
.app-list-item--subtitle {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    opacity: var(--app-list-item-subtitle-opacity, var(--app-medium-emphasis-opacity));
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    word-break: initial;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.0178571429em;
    line-height: 1rem;
    text-transform: none;
}
.app-list-item--two-line .app-list-item--subtitle {
    -webkit-line-clamp: 2;
}
.app-list-item--three-line .app-list-item--subtitle {
    -webkit-line-clamp: 3;
}
@supports selector(:focus-visible) {
    .app-list-item::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border: 2px solid currentColor;
        border-radius: 4px;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }
}
</style>