<script setup lang="ts">

const props = withDefaults(defineProps<{
    icon?: string
    size?: 'x-small'|'small'|'default'|'large'|'x-large'
    density?: 'compact'|'default'|'comfortable'
    block?: boolean
    rounded?: boolean|0|'xs'|'sm'|'xl'|'lg'
    elevation?: 4|8|12|16|20|24|"4"|"8"|"12"|"16"|"20"|"24"
    flat?: boolean
    ripple?: boolean
    disabled?: boolean
    variant?: 'plain'|'text'|'outlined'|'tonal'|'flat'|'elevated'
    color?: string
    type?: 'submit'|'reset'|'button'
}>(), {
    ripple: true,
    type: 'button'
})

const NO_BG_VARIANTS = ['outlined', 'text', 'plain']
const variant = props.variant||(props.flat ? 'flat' : 'elevated')
const buttonClasses = {
    'app-btn': true,
    'app-btn--icon': !!props.icon,
    [`app-btn--density-${props.density||'default'}`]: true,
    [`app-btn--size-${props.size||'default'}`]: true,
    [`app-btn--variant-${variant}`]: true,
    [`elevation-${props.elevation}`]: !!props.elevation,
    'app-btn--rounded': !!props.rounded,
    [`rounded-${props.rounded===false ? 0 : props.rounded}`]: props.rounded!==true&&!!props.rounded,
    'app-btn--disabled': !!props.disabled,
    [`bg-${props.color}`]: (!NO_BG_VARIANTS.includes(variant)),
    [`text-${props.color}`]: (NO_BG_VARIANTS.includes(variant)),
}
</script>
<template>
    <button :type="type" :class="buttonClasses" v-ripple="ripple" :disabled="disabled">
        <span class="app-btn--overlay"></span>
        <span class="app-btn--underlay"></span>
        <span class="app-btn--content" data-no-activator>
            <element-icon v-if="icon" :icon="icon" :size="size" />
            <slot v-else />
        </span>
    </button>
</template>

<style scoped>
.app-btn {
    align-items: center;
    border-radius: 4px;
    display: inline-grid;
    grid-template-areas: "prepend content append";
    grid-template-columns: max-content auto max-content;
    font-weight: 500;
    justify-content: center;
    letter-spacing: 0.0892857143em;
    line-height: normal;
    max-width: 100%;
    outline: none;
    position: relative;
    text-decoration: none;
    text-indent: 0.0892857143em;
    text-transform: uppercase;
    transition-property: box-shadow, transform, opacity, background;
    transition-duration: 0.28s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    vertical-align: middle;
    flex-shrink: 0;
    border-color: rgba(var(--app-border-color), var(--app-border-opacity));
    border-style: solid;
    border-width: 0;
}
.app-btn--rounded {
    border-radius: 4px;
}
.app-btn--size-x-large {
    --app-btn-size: 1.125rem;
    --app-btn-height: 52px;
    font-size: var(--app-btn-size);
    min-width: 92px;
    padding: 0 24px;
}
.app-btn--size-large {
    --app-btn-size: 1rem;
    --app-btn-height: 44px;
    font-size: var(--app-btn-size);
    min-width: 78px;
    padding: 0 20px;
}
.app-btn--size-default {
    --app-btn-size: 0.875rem;
    --app-btn-height: 36px;
    font-size: var(--app-btn-size);
    min-width: 64px;
    padding: 0 16px;
}
.app-btn--size-small {
    --app-btn-size: 0.75rem;
    --app-btn-height: 28px;
    font-size: var(--app-btn-size);
    min-width: 50px;
    padding: 0 12px;
}
.app-btn--size-x-small {
    --app-btn-size: 0.625rem;
    --app-btn-height: 20px;
    font-size: var(--app-btn-size);
    min-width: 36px;
    padding: 0 8px;
}
.app-btn--variant-plain, .app-btn--variant-outlined, .app-btn--variant-text, .app-btn--variant-tonal {
    background: transparent;
    color: inherit;
}
.app-btn--variant-plain {
    opacity: 0.62;
}
.app-btn--variant-outlined {
    border: thin solid currentColor;
}
.app-btn--variant-elevated, .app-btn--variant-flat {
    background: rgb(var(--app-theme-surface));
    color: rgba(var(--app-theme-on-surface), var(--app-high-emphasis-opacity));
}
.app-btn--variant-elevated {
    box-shadow: 0px 3px 1px -2px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.app-btn--overlay {
    background-color: currentColor;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}
.app-btn--overlay, .app-btn--underlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.app-btn--overlay {
    transition: none;
}
.app-btn--variant-plain .app-btn--overlay {
    display: none;
}
.app-btn--variant-text .app-btn--overlay {
    background: currentColor;
}
.app-btn .app-btn--underlay {
    position: absolute;
}
.app-btn--icon {
    border-radius: 50%;
    min-width: 0;
    padding: 0;
}
.app-btn.app-btn--density-default {
    height: calc(var(--app-btn-height) + 0px);
}
.app-btn--icon.app-btn--density-default {
    width: calc(var(--app-btn-height) + 12px);
    height: calc(var(--app-btn-height) + 12px);
}
.app-btn.app-btn--density-compact {
    height: calc(var(--app-btn-height) + -12px);
}
.app-btn.app-btn--density-comfortable {
    height: calc(var(--app-btn-height) + -8px);
}
.app-btn--elevated:hover, .app-btn--elevated:focus {
    box-shadow: 0px 2px 4px -1px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 4px 5px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 10px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.app-btn--content, .app-btn--prepend, .app-btn--append {
    align-items: center;
    display: flex;
    transition: transform, opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.app-btn--content {
    grid-area: content;
    justify-content: center;
    white-space: nowrap;
}
.app-btn:hover > .app-btn--overlay {
    opacity: calc(var(--app-hover-opacity)* var(--app-theme-overlay-multiplier));
}
@supports selector(:focus-visible) {
    .app-btn::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border: 2px solid currentColor;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }
}
</style>