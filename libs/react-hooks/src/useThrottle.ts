import {throttle, ThrottleSettings} from "lodash-es"
import {AnyFn} from "./type";
import {useLatestFn} from "./useLatestFn";
import {useMemo} from "react";

const throttleSettings: ThrottleSettings = {
    leading: true,
    trailing: false,
}

/**
 * @publicApi
 * @param fn
 * @param ms
 */
export function useThrottle<F extends AnyFn>(fn: F, ms: number) {
    const latestFn = useLatestFn(fn)
    return useMemo(() => throttle(latestFn, ms, throttleSettings), [ms])
}
