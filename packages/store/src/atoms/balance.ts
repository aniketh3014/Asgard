import { atom } from 'recoil'

export const balanceAtom = atom<Number>({
    key: 'balanceAtom',
    default: 0
})