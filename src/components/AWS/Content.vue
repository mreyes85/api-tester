<script setup lang="ts">
// import { storeToRefs } from 'pinia';

// const awsStore = useAwsUserStore()
// const { status } = storeToRefs(awsStore)
// const username = ref<string>()
// watch(status, async (v) => {
//     if (v?.signInStep!=='DONE') return
//     const [error, attributes] = await awsStore.getUserAttributes()
//     if (error) throw error
//     username.value = attributes.name
// })
</script>

<template>
    <api-collection />
</template>

<style scoped>
</style>