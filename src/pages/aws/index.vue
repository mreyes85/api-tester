<script setup lang="ts">
const awsStore = useAwsUserStore()
</script>

<template>
    <div class="w-100 h-100">
        <AWS-login v-if="!awsStore.isAuthenticated()" />
        <AWS-content v-else />
    </div>
</template>