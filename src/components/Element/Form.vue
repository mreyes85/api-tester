<script setup lang="ts">
type ValidationTypes = 'blur'|'lazy-blur'|'input'|'lazy-input'|'submit'

const props = withDefaults(defineProps<{
    action?: string
    disabled?: boolean
    readonly?: boolean
    validateOn?: ValidationTypes
}>(),{
    validateOn: 'submit'
})
const valid = defineModel<boolean>()
const emit = defineEmits(['submit'])
const form = ref<HTMLFormElement>()

function validate(element: EventTarget) {
    valid.value = element.dispatchEvent(new Event('validate', {cancelable: true}))
}

let timeout: NodeJS.Timeout
function validationHandler (event: Event, types: ValidationTypes[]) {
    if (!types.includes(props.validateOn)) return
    const element = event.target
    if (!element) return
    if (!props.validateOn.startsWith('lazy')) return validate(element)
    timeout = lazy(()=>{ validate(element) }, timeout)
}

function onFieldInput (event: Event) {
    validationHandler(event, ['input', 'lazy-input'])
}

function onFieldChange (event: Event) {
    validationHandler(event, ['blur', 'lazy-blur'])
}

function onFormSubmit (_: Event) {
    if (!form.value) return
    if (props.validateOn==='submit') {
        for (const element of form.value) {
            if (element.nodeName==='BUTTON') continue
            validate(element)
        }
    }
    if (!valid.value) return
    emit('submit', form.value)
}

function onFormReset (event: Event) {
    console.log(event)
}

</script>

<template>
    <form ref="form" @input="onFieldInput" @change="onFieldChange" @submit.prevent="onFormSubmit" @reset="onFormReset">
        <slot />
    </form>
</template>

<style scoped>
</style>