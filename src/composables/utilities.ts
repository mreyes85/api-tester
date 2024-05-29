export const isString = (value: any): value is string => typeof value === 'string'
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'
export const isNumber = (value: any): value is number => typeof value === 'number'
export const isArray = (value: any): value is Array<any> => Array.isArray(value)
export const isObject = (value: any): value is Object => typeof value === 'object' && value !== null
export const hasKey = <T>(obj: T, key: PropertyKey): key is keyof T => Object.prototype.hasOwnProperty.call(obj, key)

export const lazy = (callback: Function, timeout: NodeJS.Timeout) => {
    if (!timeout) timeout = setTimeout(() => { 
        callback()
        clearTimeout(timeout)
    }, 600)
    return timeout
}

export const to = async <T, U = Error>(promise: Promise<any>, errorExt?: object) => {
    return promise
                .then((data: T): [null, T] => ([null, data]))
                .catch((err: U): [U, undefined] => ((errorExt) ? [Object.assign({}, err, errorExt), undefined] : [err, undefined]))
}