<script setup lang="ts">
const items = defineModel<any[]>({ required: true })
const listClasses = {
    'app-list': true,
}
</script>

<template>
    <ul :class="listClasses">
        <element-list-item v-for="(item, index) in items" :key="index" :title="item.title" :subtitle="item.subtitle" :prependIcon="item.prependIcon" :appendIcon="item.appendIcon" :density="item.density" :lines="item.lines" :rounded="item.rounded" :sharped="item.sharped" :disabled="item.disabled" :link="item.link" :to="item.to" :replace="item.replace">
            <template #prepend>
                <slot name="prepend" :item :index />
            </template>
            <template #default>
                <slot :item :index />
            </template>
            <template #append>
                <slot name="append" :item :index />
            </template>
        </element-list-item>
    </ul>
</template>

<style scoped>
.app-list {
    --indent-padding: 0px;
    overflow: auto;
    padding: 8px 0;
    position: relative;
    outline: none;
    border-color: rgba(var(--app-border-color), var(--app-border-opacity));
    border-style: solid;
    border-width: 0;
    box-shadow: 0px 0px 0px 0px var(--app-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--app-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--app-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
    border-radius: 0;
    background: rgba(var(--app-theme-surface));
    color: rgba(var(--app-theme-on-surface), var(--app-high-emphasis-opacity));
}
</style>