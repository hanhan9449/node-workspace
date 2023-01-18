import {useState} from "react";

export function useBoolean(defaultValue = false) {
    const [value, setValue] = useState(defaultValue)

    function setTo(next: boolean) {
        setValue(!!next)
    }

    return [value, setTo] as const
}