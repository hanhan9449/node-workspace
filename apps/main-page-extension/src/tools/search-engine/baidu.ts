import {Base} from "./base";

export class Baidu extends Base {
    doSearch(query: string): void {
        const urlObj = new URL('https://www.baidu.com/s')
        urlObj.searchParams.set('wd', query)
        location.href = urlObj.toString()
    }

    async fetchPreviewList(query: string): Promise<string[]> {
        return []
    }

}