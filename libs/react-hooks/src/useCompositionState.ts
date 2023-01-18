import {LegacyRef, MutableRefObject, useLayoutEffect, useRef} from "react";
import {useBoolean} from "./useBoolean";

export function useCompositionState(ref: MutableRefObject<HTMLElement | null>) {
    const [b, setB] = useBoolean(false)
    const [hasSet, setHasSet] = useBoolean(false)

    useLayoutEffect(() => {
        if (!ref.current) {
            return
        }
        if (hasSet) {
            return
        }
        setHasSet(true)
        ref.current.addEventListener('compositionstart', (e) => {
            setB(true)
        })
        ref.current.addEventListener('compositionend', (e) => {
            setB(false)
        })

    })
    return [b, hasSet] as const
}