<script setup lang="ts">

const tabTitles = ['Tab 1', 'Tab 2', 'Tab 3']

</script>

<template>
    <layout-tabs :titles="tabTitles">
        <div>Text 1</div>
        <div>Text 2</div>
        <div>Text 3</div>
    </layout-tabs>
</template>

<style scoped>
</style>