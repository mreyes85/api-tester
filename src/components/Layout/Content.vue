<script setup lang="ts">
</script>

<template>
    <main class="app-content">
        <slot />
    </main>
</template>

<style scoped>
.app-header--density-default + .app-layout > .app-content,
.app-header--density-default + * + .app-content {
    --app-layout-w-header: var(--app-header-size-default);
}
.app-header--density-comfortable + .app-layout > .app-content,
.app-header--density-comfortable + * + .app-content {
    --app-layout-w-header: var(--app-header-size-confortable);
}
.app-header--density-compact + .app-layout > .app-content,
.app-header--density-compact + * + .app-content {
    --app-layout-w-header: var(--app-header-size-compact);
}
.app-content {
    flex: 1 0 auto;
    max-width: 100%;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    padding-left: var(--app-layout-left);
    padding-right: var(--app-layout-right);
    padding-top: var(--app-layout-top);
    padding-bottom: var(--app-layout-bottom);
    height: calc(100dvh - var(--app-layout-w-header, 0px));
}
.app-nav--size-default + .app-content {
    --app-layout-left: var(--app-nav-size-default);
    --app-layout-right: 0px;
    --app-layout-top: 0px;
    --app-layout-bottom: 0px;
}
.app-nav--size-compact + .app-content {
    --app-layout-left: var(--app-nav-size-compact);
    --app-layout-right: 0px;
    --app-layout-top: 0px;
    --app-layout-bottom: 0px;
}
.app-nav--close + .app-content {
    --app-layout-left: 0px
}
</style>