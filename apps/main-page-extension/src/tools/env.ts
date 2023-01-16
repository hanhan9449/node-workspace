import {DEBUG, WARN} from "./simple-logger";

export const IS_DEV = import.meta.env.DEV
const IS_CHROME_OR_EDGE_EXTENSION = chrome?.extension
export const IS_EXTENSION = IS_CHROME_OR_EDGE_EXTENSION

if (!IS_EXTENSION) {
    WARN('你当前在非浏览器插件模式运行，某些表现可能会不一致')
}