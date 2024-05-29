import { defineStore, skipHydrate } from 'pinia'
import { Amplify } from 'aws-amplify'
import type { AuthSession, ResourcesConfig } from '@aws-amplify/core'
import { FetchUserAttributesOutput, SignInOutput, fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth'

const existingConfig = Amplify.getConfig()

interface API_DATA {
  name: string,
  url: string,
  region: string,
}

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAwsUserStore = defineStore('aws-user', () => {
    
    const APIS = useLocalStorage<API_DATA[]>('aws-apis', [])
    const userPool = useLocalStorage<string>('aws-user-pool', '')
    const clientId = useLocalStorage<string>('aws-client-id', '')
    const identityPool = useLocalStorage<string>('aws-identity-pool', '')
    const status = ref<SignInOutput['nextStep']>()

    async function init () {
        configureAwsAmplify()
        const [error, credentials] = await getUserCredentials()
        if(error||!credentials.tokens) return
        setStatus({signInStep: 'DONE'})
    }

    const awsAmplifyConfig = computed((): ResourcesConfig => ({
        Auth: {
            ...existingConfig.Auth,
            Cognito: {
            ...existingConfig.Auth?.Cognito,
            userPoolId: userPool.value,
            userPoolClientId: clientId.value,
            identityPoolId: identityPool.value,
            },
        },
        API: {
            ...existingConfig.API,
            REST: {
            ...existingConfig.API?.REST,
            ...(APIS && Object.assign({}, ...APIS.value.map(api => ({ [api.name]: {
                endpoint: api.url,
                region: api.region,
            } })) ) )
            },
        },
    }))

    const setApi = ({name, url, region}: API_DATA) =>{
        APIS.value.push({name, url, region})
    }

    const setAmplifyData = (userPoolStr: string, clientIdStr: string, identityPoolStr: string) => {
        userPool.value = userPoolStr
        clientId.value = clientIdStr
        identityPool.value = identityPoolStr
    }

    const configureAwsAmplify = () => {
        Amplify.configure(awsAmplifyConfig.value)
    }

    const setStatus = (value: SignInOutput['nextStep']) => {
        status.value = value
    }

    const isAuthenticated = () => (status.value?.signInStep==='DONE')

    const getUserCredentials = async (forceRefresh: boolean = false) => {
        return await to<AuthSession>(fetchAuthSession({ forceRefresh }))
    }

    const getUserAttributes = async () => {
        return await to<FetchUserAttributesOutput>(fetchUserAttributes())
    }

    init()

    return {
        APIS: skipHydrate(APIS),
        status: status,
        setApi,
        configureAwsAmplify,
        setAmplifyData,
        setStatus,
        isAuthenticated,
        getUserCredentials,
        getUserAttributes,
    }

})