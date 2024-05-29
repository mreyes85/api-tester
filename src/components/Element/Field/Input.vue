<script setup lang="ts">
import { nanoid } from 'nanoid';

const props = withDefaults(defineProps<{
    type?: 'text'|'password'|'email'|'number'|'search'|'tel'|'url'|'date'|'datetime-local'|'month'|'time'|'week'|'range'|'color'|'hidden'
    name: string
    label?: string
    placeholder?: string
    prependInnerIcon?: string
    prependIcon?: string
    appendIcon?: string
    appendInnerIcon?: string
    readonly?: boolean
    disabled?: boolean
    clearable?: boolean
    required?: boolean
    density?: 'default'|'comfortable'|'compact'
    variant?: 'underlined'|'outlined'|'filled'|'solo'|'solo-inverted'|'solo-filled'|'plain'
    color?: string
    rules?: Array<(value?: any) => string|boolean>
}>(), {
    type: 'text',
    placeholder: '',
    variant: 'filled'
})
const model = defineModel<any>()

defineEmits([
    'prependClicked',
    'innerPrependClicked',
    'appendClicked',
    'innerAppendClicked',
])

const id = nanoid()
const inputClasses = computed(()=>({
    'app-input': true,
    'app-input--horizontal': true,
    [`app-input--density-${props.density||'default'}`]: true,
    [`app-input--variant-${props.variant}`]: true,
    'app-input--disabled': !!props.disabled,
    'app-input--readonly': !!props.readonly,
    'app-input--content-appended': props.appendInnerIcon||props.clearable,
    'app-input--content-prepended': props.prependInnerIcon,
    'app-input--error': (messages.value.length>0),
}))

const rules = ref(props.rules||[])
if (props.required) rules.value.push((v) => (!v ? 'Field is mandatory' : false))

const messages = ref<string[]>([])
function handleValidation(event?: Event) {
    messages.value = []
    if (!rules) return;
    for (const rule of rules.value) {
        const result = rule((event?.target as HTMLInputElement).value)
        if(!isString(result)) continue
        messages.value?.push(result)
    }
    if (messages.value.length>0) event?.preventDefault()
}

function handleInput(event: Event) {
    model.value = (event.target as HTMLInputElement).value
}
</script>

<template>
    <div :class="inputClasses">
        <div class="app-input--prepend" v-if="prependIcon">
            <element-icon :icon="prependIcon" @click="$emit('prependClicked')" />
        </div>
        <div class="app-input--content">
            <element-field-wrapper :variant="variant" :color="color" :clearable="clearable" :appendInnerIcon="appendInnerIcon" :prependInnerIcon="prependInnerIcon" :name="name" @clear="model=''" @prepend-clicked="$emit('innerPrependClicked')" @append-clicked="$emit('innerAppendClicked')">
                <div class="app-input--content-field">
                    <input class="app-input--field" :type="type" :name="name" :value="model" :id="id" :disabled="disabled" :readonly="readonly" :required="required" :placeholder="placeholder" @validate="handleValidation" @input="handleInput" />
                    <label class="app-input--label" v-if="label" :for="id">{{ label }}</label>
                </div>
            </element-field-wrapper>
        </div>
        <div class="app-input--append" v-if="appendIcon">
            <element-icon :icon="appendIcon" @click="$emit('appendClicked')" />
        </div>
        <div class="app-input--details">
            <div v-if="messages" class="app-messages" role="alert" aria-live="polite" :id="`${id}-messages`">
                <div v-for="(message, i) in messages" :key="i" class="app-messages--content">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<style>
.app-input {
    display: grid;
    flex: 1 1 auto;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
}
.app-input--disabled {
    pointer-events: none;
}
.app-input--density-default {
    --app-input-control-height: 56px;
    --app-input-padding-top: 16px;
}
.app-input--density-comfortable {
    --app-input-control-height: 48px;
    --app-input-padding-top: 12px;
}
.app-input--density-compact {
    --app-input-control-height: 40px;
    --app-input-padding-top: 8px;
}
.app-input--horizontal {
    grid-template-areas:
        "prepend control append"
        "a messages b";
    grid-template-columns: max-content minmax(0, 1fr) max-content;
    grid-template-rows: auto auto;
}
.app-input--vertical {
    grid-template-areas:
        "append"
        "control"
        "prepend";
    grid-template-rows: max-content auto max-content;
    grid-template-columns: min-content;
}
.app-input--prepend, .app-input--append{
    display: flex;
    /* align-items: flex-start;
    padding-top: var(--app-input-padding-top); */
    align-items: center;
    padding-top: 0;
}
.app-input--prepend {
    grid-area: prepend;
}
.app-input--append {
    grid-area: append;
}
.app-input--horizontal .app-input--prepend {
    margin-inline-end: 16px;
}
.app-input--horizontal .app-input--append {
    margin-inline-start: 16px;
}
.app-input .app-field--wrapper {
    cursor: text;
}
.app-input--disabled .app-field--wrapper {
    opacity: var(--app-disabled-opacity);
    pointer-events: none;
}
.app-input--density-default.app-input--variant-solo .app-field--wrapper,
.app-input--density-default.app-input--variant-solo-inverted .app-field--wrapper,
.app-input--density-default .app-input--variant-solo-filled .app-field--wrapper,
.app-input--density-default .app-input--variant-filled .app-field--wrapper {
    --app-input-control-height: 56px;
    --app-field-padding-bottom: 4px;
}
.app-input--density-default.app-input--variant-outlined .app-field--wrapper,
.app-input--density-default .app-input--single-line .app-field--wrapper,
.app-input--density-default.app-input--no-label .app-field--wrapper {
    --app-field-padding-bottom: 16px;
}
.app-input--variant-plain .app-field--wrapper, .app-input--variant-underlined .app-field--wrapper {
    --app-field-padding-start: 0px;
    --app-field-padding-end: 0px;
}
.app-input--density-default.app-input--variant-plain .app-field--wrapper,
.app-input--density-default.app-input--variant-underlined .app-field--wrapper {
    --app-input-control-height: 48px;
    --app-field-padding-top: 4px;
    --app-field-padding-bottom: 4px;
}
.app-input--variant-filled .app-field--overlay {
    background-color: currentColor;
    opacity: 0.04;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.app-input--content {
    display: flex;
    grid-area: control;
}
.app-input--details {
    align-items: flex-end;
    display: flex;
    font-size: 0.75rem;
    font-weight: 400;
    grid-area: messages;
    letter-spacing: 0.0333333333em;
    line-height: normal;
    min-height: 22px;
    padding-top: 6px;
    overflow: hidden;
    justify-content: space-between;
}
.app-messages {
    flex: 1 1 auto;
    font-size: 12px;
    min-height: 14px;
    min-width: 1px;
    opacity: var(--app-medium-emphasis-opacity);
    position: relative;
}
.app-messages--content {
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    transition-duration: 150ms;
}
.app-input--content-field {
    flex: 1 0;
    grid-area: field;
    position: relative;
    align-items: flex-start;
    display: flex;
}
.app-input--content-appended .app-field--wrapper {
    --app-field-padding-end: 6px;
    padding-inline-end: 12px;
}
.app-input--field {
    display: block;
    width: 100%;
    padding: 1rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    height: calc(3.5rem + 2px);
    line-height: 1.25;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.app-input--field:focus {
    outline: 0;
}
.app-input--field:focus, .app-input--field:not(:placeholder-shown) {
    padding-top: 1.625rem;
    padding-bottom: .625rem;
}
.app-input--error .app-input--field {
/* .app-input--field:invalid { */
    padding-right: calc(1.5em + .75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(.375em + .1875rem) center;
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
.app-input--error .app-input--field:focus {
/* , .app-input--field:invalid:focus { */
    box-shadow: 0 0 0 .25rem rgba(var(--app-theme-error), var(--app-border-opacity));
}
.app-input--label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 1rem .75rem;
    pointer-events: none;
    border: 1px solid transparent;
    transform-origin: 0 0;
    transition: opacity .1s ease-in-out, transform .1s ease-in-out;
}
.app-input--field:focus~.app-input--label, .app-input--field:not(:placeholder-shown)~.app-input--label {
    opacity: .65;
    transform: scale(.85) translateY(-.5rem) translateX(.15rem);
}
.app-input--variant-filled .app-field--content-outline::before, .app-input--variant-underlined .app-field--content-outline::before {
    border-color: currentColor;
    border-style: solid;
    border-width: 0 0 var(--app-field-border-width);
    opacity: var(--app-field-border-opacity);
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.app-input--variant-outlined .app-field--content-outline::before {
    border-color: currentColor;
    border-style: solid;
    border-width: var(--app-field-border-width);
    opacity: var(--app-field-border-opacity);
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.app-input--variant-outlined:has(.app-input--field:focus) .app-field--content-outline {
    --app-field-border-width: 2px;
    --app-field-border-opacity: 1;
}
.app-input--error:not(.app-input--disabled) .app-field--content-outline,
.app-input--error:not(.app-input--disabled) .app-input--label,
.app-input--error:not(.app-input--disabled) .app-messages--content {
    color: rgb(var(--app-theme-error), var(--app-high-emphasis-opacity));
}
</style>