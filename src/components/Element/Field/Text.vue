<script setup lang="ts">
withDefaults(defineProps<{
    type?: 'text'|'password'|'email'|'number'|'search'|'tel'|'url'|'date'|'datetime-local'|'month'|'time'|'week'|'range'|'color'|'hidden'
    name: string
    label?: string
    prependInnerIcon?: string
    prependIcon?: string
    appendIcon?: string
    appendInnerIcon?: string
    readonly?: boolean
    disabled?: boolean
    required?: boolean
    density?: 'default'|'comfortable'|'compact'
    variant?: 'underlined'|'outlined'|'filled'|'solo'|'solo-inverted'|'solo-filled'|'plain'
    color?: string
    rules?: Array<(value?: any) => string|boolean>
}>(), {
    type: 'text'
})
const model = defineModel<any>()

defineEmits([
    'prependClicked',
    'innerPrependClicked',
    'appendClicked',
    'innerAppendClicked',
])
</script>

<template>
    <element-field-input class="app-text-field" 
        :type="type"
        :name="name"
        :label="label"
        :prependInnerIcon="prependInnerIcon"
        :prependIcon="prependIcon"
        :appendIcon="appendIcon"
        :appendInnerIcon="appendInnerIcon"
        :readonly="readonly"
        :disabled="disabled"
        :required="required"
        :density="density"
        :variant="variant"
        :color="color"
        :rules="rules"
        v-model="model"
        @appendClicked="$emit('appendClicked')"
        @innerAppendClicked="$emit('innerAppendClicked')"
        @prependClicked="$emit('prependClicked')"
        @innerPrependClicked="$emit('innerPrependClicked')"
        />
</template>

<style scoped>
.app-text-field .app-input--details {
    padding-inline: 16px;
}
</style>