import {Bing} from "./bing";
import {Bytedance} from "./bytedance";
import {Google} from "./google";
import {Baidu} from "./baidu";

export type SearchEngineNameType = 'bing' | 'bytedance' | 'google' | 'baidu'
export function searchEngineFactory(name: SearchEngineNameType) {
    switch (name) {
        case "bytedance": return new Bytedance()
        case "google": return new Google()
        case "bing": return new Bing()
        case 'baidu': return new Baidu()
        default: return new Bing()
    }
}