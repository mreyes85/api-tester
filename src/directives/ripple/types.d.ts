import { Directive } from "vue"

export interface IRipple {
    bind: Directive<HTMLElement, DirectiveBinding>
    color?: string
    zIndex?: string
}
