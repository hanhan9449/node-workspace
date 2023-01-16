import {DEBUG, WARN} from "./simple-logger";
import {IS_EXTENSION} from "./env";

declare global {
    const chrome: any
}
abstract class Base {
    abstract get<T = any>(key: string): Promise<T | null>
    abstract set<T = any>(key: string, value: T): Promise<void>
    abstract listen(key: string, cb: (next: any) => void): void
}
class ChromeStorage extends Base {

    instance: any
    constructor(field: 'local' | 'sync') {
        super();
        this.instance = chrome.storage[field]
    }

    get<T = any>(key: string): Promise<T | null> {
        return this.instance.get([key]).then((it: any) => it[key])
    }

    listen(key: string, cb: (next: any) => void): void {
        return chrome.storage.onChanged.addListener((changes: any, namespace: any) => {
            for (let [key1, {oldValue, newValue}] of Object.entries(changes) as any) {
                if (key === key1) {
                    cb(newValue)
                }
            }
        })
    }

    set<T = any>(key: string, value: T): Promise<void> {
        return this.instance.set({[key]: value})
    }

}
class LocalStorage extends Base {
    async get<T = any>(key: string): Promise<T | null> {
        const res =  localStorage.getItem(key)
        if (!res) {
            return res as null
        }
        return JSON.parse(res)

    }

    listen(key: string, cb: (next: any) => void): void {
        DEBUG('此处listen实现有change了另外一个页面没有接受到的情况，可能是事件的限制')
        window.addEventListener("storage", e => {
            cb(e.newValue)
        })
    }

    async set<T = any>(key: string, value: T): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

const Storage = !IS_EXTENSION ? LocalStorage : ChromeStorage

export const syncStorage = new Storage('sync')
export const llocalStorage = new Storage('local')