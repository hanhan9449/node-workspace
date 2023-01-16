import {Const, PureConst} from "../const";
import {IS_DEV} from "./env";

export function DEBUG(...msgs: any[]) {
    if (!IS_DEV) {
        return
    }
    console.error(`【${PureConst.SHORT_NAME}】😊`, ...msgs)
}

export function WARN(...msgs: any[]) {
    console.warn(`【${PureConst.SHORT_NAME}】😢`, ...msgs)
}