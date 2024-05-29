<script setup lang="ts">
import { signIn } from 'aws-amplify/auth'

const region = ref<string>(import.meta.env.APP_AWS_REGION||'')
const userPool = ref<string>(import.meta.env.APP_AWS_USER_POOL||'')
const clientId = ref<string>(import.meta.env.APP_AWS_CLIENT_ID||'')
const identityPool = ref<string>(import.meta.env.APP_AWS_IDENTITY_POOL_ID||'')
const username = ref<string>('')
const password = ref<string>('')

const showPassword = ref(false)

const awsStore = useAwsUserStore()
async function login(_: HTMLFormElement) {
    if (!username.value) return
    
    awsStore.setAmplifyData(userPool.value, clientId.value, identityPool.value)

    awsStore.configureAwsAmplify()
    const result = await signIn({
        username: username.value,
        password: password.value,
        // options: { authFlowType: 'USER_SRP_AUTH' },
    })
    awsStore.setStatus(result.nextStep)
}
</script>

<template>
    <element-center-container>
        <element-card>
            <element-center-container>
                <element-avatar icon="mdi:aws" size="xl" />
            </element-center-container>
            <element-form class="app-aws-login-form pa-6" validate-on="input" @submit="login">
                <element-field-text v-if="!region" name="region" v-model="region" class="pb-4" label="AWS Region" clearable prepend-icon="mdi:aws" />
                <element-field-text v-if="!userPool" name="user-pool" v-model="userPool" class="pb-4" label="AWS User Pool" clearable prepend-icon="mdi:aws" />
                <element-field-text v-if="!clientId" name="client-id" v-model="clientId" class="pb-4" label="AWS Client ID" clearable prepend-icon="mdi:aws" />
                <element-field-text v-if="!identityPool" name="identity-pool" v-model="identityPool" class="pb-4" label="AWS Identity Pool ID" clearable prepend-icon="mdi:aws" />
                <element-field-text name="username" v-model="username" class="pb-4" label="User Name" clearable required prepend-icon="mdi:account" />
                <element-field-text name="password" v-model="password" label="Password" type="password" class="pb-4" :prepend-icon="!showPassword ? 'mdi:lock' : 'mdi:eye-lock-open-outline'" clearable  @prepend-clicked="showPassword=!showPassword" />
                <element-center-container>
                    <element-button type="submit" color="primary">Log in</element-button>
                </element-center-container>
            </element-form>
        </element-card>
    </element-center-container>
</template>

<style scoped>
.app-aws-login-form {
    min-width: 500px;
}
</style>