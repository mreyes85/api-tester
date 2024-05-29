<script setup lang="ts">

const props = defineProps<{
    icon: string
    size?: 'xs'|'sm'|'md'|'lg'|'xl'|number
}>()
const data = computed(() => {
    let t, p
    [t, p] = props.icon?.split(':')
    if(!p) [t, p] = t.split('-')
    if(!p) return ['mdi', t]
    return [t, p]
})
const iconClasses = {
    'app-icon': true,
    [`app-btn--size-${props.size||'xs'}`]: true,
}

const SIZES: Record<string|number, number> = {
    'xs': 24,
    'sm': 32,
    'md': 48,
    'lg': 64,
    'xl': 96,
}
const innerSize = SIZES[props.size||''] || props.size || 24
</script>
<template>
    <i :class="iconClasses">
        <mdicon v-if="data[0]==='mdi'" :name="data[1]" :width="innerSize" :height="innerSize" />
    </i>
</template>

<style scoped>
.app-icon {
    --app-icon-size-multiplier: 1;
    align-items: center;
    display: inline-flex;
    font-feature-settings: "liga";
    /* height: 1em; */
    justify-content: center;
    letter-spacing: normal;
    line-height: 1;
    position: relative;
    text-indent: 0;
    text-align: center;
    user-select: none;
    vertical-align: middle;
    /* width: 1em; */
    min-width: 1em;
}
/* .app-icon--size-x-large {
    font-size: calc(var(--v-icon-size-multiplier) * 2em);
}
.app-icon--size-large {
    font-size: calc(var(--v-icon-size-multiplier) * 1.75em);
}
.app-icon--size-default {
    font-size: calc(var(--v-icon-size-multiplier) * 1.5em);
}
.app-icon--size-small {
    font-size: calc(var(--v-icon-size-multiplier) * 1.25em);
}
.app-icon--size-x-small {
    font-size: calc(var(--v-icon-size-multiplier) * 1em);
}
.app-btn .app-icon {
    --app-icon-size-multiplier: 1;
} */
</style>