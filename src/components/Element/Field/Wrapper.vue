<script setup lang="ts">
const props = defineProps<{
    name: string
    variant: 'underlined'|'outlined'|'filled'|'solo'|'solo-inverted'|'solo-filled'|'plain'
    color?: string
    clearable?: boolean
    prependIcon?: string
    appendIcon?: string
}>()

defineEmits([
    'clear',
    'prependClicked',
    'appendClicked',
])

const NO_BG_VARIANTS = ['outlined', 'text', 'plain']
const wrapperClasses = computed(() => ({
    'app-field--wrapper': true,
    ...(props.color && { 
        [`bg-${props.color}`]: (!NO_BG_VARIANTS.includes(props.variant)),
        [`text-${props.color}`]: (NO_BG_VARIANTS.includes(props.variant)),
    }),
}))
</script>
<template>
    <div :class="wrapperClasses">
        <div class="app-field--overlay"></div>
        <div class="app-field--prepend" v-if="prependIcon">
            <element-icon :icon="prependIcon" @click="$emit('prependClicked')" />
        </div>
        <slot></slot>
        <div class="app-field--clearable" v-if="clearable">
            <element-icon icon="mdi:close-circle" role="button" aria-hidden="false" tabindex="0" :aria-label="`Clear ${name}`" @click="$emit('clear')" />
        </div>
        <div class="app-field--append" v-if="appendIcon">
            <element-icon :icon="appendIcon" @click="$emit('appendClicked')" />
        </div>
        <div class="app-field--content-outline"></div>
    </div>
</template>

<style>
.app-field--wrapper {
    display: grid;
    grid-template-areas: "prepend-inner field clear append-inner";
    grid-template-columns: min-content minmax(0, 1fr) min-content min-content;
    font-size: 16px;
    letter-spacing: 0.009375em;
    max-width: 100%;
    border-radius: 4px;
    contain: layout;
    flex: 1 0;
    grid-area: control;
    position: relative;
    --app-input-padding-start: 16px;
    --app-input-padding-end: 16px;
    --app-input-padding-top: 8px;
    --app-input-padding-bottom: 4px;
    --app-input-input-padding-top: calc(var(--app-input-padding-top, 8px) + var(--app-input-padding-top, 0));
    --app-input-input-padding-bottom: var(--app-input-padding-bottom, 4px);
}

.app-field--overlay {
    border-radius: inherit;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.app-field--content-outline {
    --app-field-border-width: 1px;
    --app-field-border-opacity: 0.38;
    align-items: stretch;
    contain: layout;
    display: flex;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    width: 100%;
}

.app-field--prepend {
    grid-area: prepend-inner;
    padding-inline-end: var(--app-field-padding-after);
}
.app-field--append {
    grid-area: append-inner;
    padding-inline-start: var(--app-field-padding-after);
}
.app-field--clearable {
    grid-area: clear;
}
.app-field--append, .app-field--clearable, .app-field--prepend {
    display: flex;
    /* align-items: flex-start;
    padding-top: var(--app-input-padding-top, 8px); */
    align-items: center;
    padding-top: 0;
}
.app-field--clearable {
    cursor: pointer;
    opacity: 0;
    /* overflow: hidden; */
    margin-inline: 4px;
    transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: opacity, transform, width;
}
.app-field--wrapper:hover .app-field--clearable {
    opacity: 1;
}

/* .v-field--center-affix .v-field__append-inner, .v-field--center-affix .v-field__clearable, .v-field--center-affix .v-field__prepend-inner {
    align-items: center;
    padding-top: 0;
} */
</style>