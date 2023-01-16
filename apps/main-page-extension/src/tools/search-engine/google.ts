import {Base} from "./base";
import {DEBUG} from "../simple-logger";

export class Google extends Base {
    doSearch(query: string): void {
        const urlObj = new URL('https://www.google.com/search')
        urlObj.searchParams.set('q', query)
        location.href = urlObj.toString()
    }

    async fetchPreviewList(query: string): Promise<string[]> {
        const urlObj = new URL('https://www.google.com/complete/search?q=20&cp=2&client=gws-wiz&xssi=t&hl=zh-CN&authuser=0&psi=LWzCY4XxGNDe2roPpN2cuA8.1673686062128&dpr=1')
        urlObj.searchParams.set('q', query)
        urlObj.searchParams.set('cp', String(query.length))
        const res = await fetch(urlObj.toString(), {
            mode: 'no-cors'
        }).then(res => res.text())

        function getArrayFromRes(res: string) {
            const json = JSON.parse(res.split('\n')[1])
            return json[0].map((it: any) => it[0])
        }
        return getArrayFromRes(res)
    }

}