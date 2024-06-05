<script setup lang="ts">

defineProps<{
    titles: string[]
}>()

const tabs = ref<Element[]>()
const tabsContent = ref<HTMLDivElement>()
watch(tabsContent, (v) => {
    if(!v) return
    tabs.value = Array.from(v.children);    
    showActiveTab(activeTab.value)
})

const activeTab = ref(0)
const showActiveTab = (activeIndex: number) => {
    if (!tabs.value) return
    tabs.value.forEach((tab, index) => {
        if(!tab) return
        (tab as HTMLElement).hidden = (activeIndex!==index)
    });
}
watch(activeTab, showActiveTab)
</script>

<template>
    <div class="app-tabs-container">
        <ul class="app-tabs-header">
            <app-layout-container>
                <div class="app-tabs-header-wrapper">
                    <li v-for="(_, index) in tabs" :key="`app-tab-${index}`" class="app-tabs-header--tab-card" @click.prevent="() => (activeTab = index)">
                        <span :class="index===activeTab ? 'app-tab--active' : ''">{{ titles[index] }}</span>
                    </li>
                </div>
            </app-layout-container>
        </ul>
        <div class="app-tabs-content" ref="tabsContent">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.app-tabs-container {
    display: flex;
    min-width: 0;
    flex-grow: 1;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 1rem;
}
.app-tabs-header {
    margin-top: .5rem;
    margin-bottom: .5rem;
    display: flex;
    align-items: center;
}
.app-tabs-header-wrapper {
    display: flex;
    border-radius: .375rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.app-tabs-header--tab-card {
    position: relative;
    display: flex;
    cursor: default;
    align-items: center;
    border-radius: .5rem;
    background-color: var(--color-bg-z1);
    padding: .375rem;
    color: var(--color-secondary);
    outline: 2px solid transparent;
    outline-offset: 2px;
    min-height: 32px;
}
</style>