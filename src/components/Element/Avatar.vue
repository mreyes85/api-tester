<script setup lang="ts">
const props = defineProps<{
    icon?: string
    size?: 'xs'|'sm'|'md'|'lg'|'xl'|number
    density?: 'default'|'comfortable'|'compact'
    variant?: 'plain'|'text'|'outlined'|'tonal'|'flat'|'elevated'
    tile?: boolean
    color?: string
}>()

const NO_BG_VARIANTS = ['outlined', 'text', 'plain']
const avatarClasses = computed(()=>({
    [`app-avatar--size-${props.size||'md'}`]: true,
    [`app-avatar--density-${props.density||'default'}`]: true,
    [`app-avatar--variant-${props.variant||'elevated'}`]: true,
    [`bg-${props.color}`]: (!NO_BG_VARIANTS.includes(props.variant||'elevated')),
    [`text-${props.color}`]: (NO_BG_VARIANTS.includes(props.variant||'elevated')),
    'rounded-0': !!props.tile,
}))
const avatarStyles = {
    ...(props.size && isNumber(props.size) && {
        width: `${props.size}px`,
        height: `${props.size}px`,
    })
}
</script>

<template>
    <div class="app-avatar app-avatar--density-default app-avatar--variant-flat" :class="avatarClasses" :style="avatarStyles">
        <slot>
            <element-icon v-if="icon" :icon="icon" :size="size" />
        </slot>
        <span class="app-avatar--underlay" />
    </div>
</template>

<style scoped>
.app-avatar {
    flex: none;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: normal;
    overflow: hidden;
    position: relative;
    text-align: center;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: width, height;
    vertical-align: middle;
    border-radius: 50%;
}
.app-avatar--variant-elevated, .app-avatar--variant-flat {
    background: var(--app-theme-surface);
    color: rgba(var(--app-theme-on-surface), var(--app-medium-emphasis-opacity));
}
.app-avatar--variant-flat {
    box-shadow: 0px 0px 0px 0px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.app-avatar--variant-elevated {
    box-shadow: 0px 2px 1px -1px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
.app-avatar--variant-outlined {
    border: thin solid currentColor;
}
.app-avatar--variant-plain {
    opacity: 0.62;
}
.app-avatar.app-avatar--size-xs {
    --app-avatar-height: 24px;
}
.app-avatar.app-avatar--size-sm {
    --app-avatar-height: 32px;
}
.app-avatar.app-avatar--size-md {
    --app-avatar-height: 48px;
}
.app-avatar.app-avatar--size-lg {
    --app-avatar-height: 64px;
}
.app-avatar.app-avatar--size-xl {
    --app-avatar-height: 96px;
}
.app-avatar.app-avatar--density-default {
    height: calc(var(--app-avatar-height) + 0px);
    width: calc(var(--app-avatar-height) + 0px);
}
.app-avatar.app-avatar--density-compact {
    height: calc(var(--app-avatar-height) + -8px);
    width: calc(var(--app-avatar-height) + -8px);
}
.app-avatar.app-avatar--density-comfortable {
    height: calc(var(--app-avatar-height) + -4px);
    width: calc(var(--app-avatar-height) + -4px);
}
.app-avatar--underlay {
    position: absolute;
}
</style>