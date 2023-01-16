import {AnyFn} from "./type";
import {useLatestFn} from "./useLatestFn";
import {useMemo} from "react";
import {debounce, DebounceSettings} from "lodash-es";

const debounceSettings: DebounceSettings = {
    leading: false,
    trailing: true,
}

/**
 * @publicApi
 * @param fn
 * @param ms
 */
export function useDebounce<F extends AnyFn>(fn: F, ms: number) {
    const latestFn = useLatestFn(fn)
    return useMemo(() => debounce(latestFn, ms, debounceSettings), [ms])
}
