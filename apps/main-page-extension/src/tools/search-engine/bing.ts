import {Base} from "./base";
import {DEBUG} from "../simple-logger";

export class Bing extends Base {
    doSearch(query: string) {
        const urlObj = new URL('https://www.bing.com/search')
        urlObj.searchParams.set('q', query)
        location.href = urlObj.toString()
    }
    async fetchPreviewList(query: string): Promise<string[]> {
        const urlObj = new URL('https://www.bing.com/AS/Suggestions?mkt=zh-cn&qry=v2e&cp=3&cvid=0')
        urlObj.searchParams.set('mkt', 'zh-cn')
        urlObj.searchParams.set('qry', query)
        urlObj.searchParams.set('cp', String(query.length))
        urlObj.searchParams.set('cvid', '0')
        const res = await fetch(urlObj.toString(), {
            mode: 'no-cors'
        }).then(res => res.text())
        function getArrayFromRes(res: string) {
            const divEl = document.createElement('div')
            divEl.innerHTML = res
            const list = [...divEl.querySelectorAll('.sa_tm_text')].map(it => (it as HTMLElement).innerText)
            DEBUG(list)
            return list

        }
        return getArrayFromRes(res)
    }
}

export const defaultSearchEngineBing = new Bing()