import {Base} from "./base";
import {decodeString, encodeString} from "@hanhan9449/utils";
import {PureConst} from "../../const";

export class Bytedance extends Base {
    doSearch(query: string) {
        const urlObj = new URL(decodeString(PureConst.BYTEDANCE))
        urlObj.searchParams.set('query', query)
        urlObj.searchParams.set('category', 'all')
        location.href = urlObj.toString()
    }
    async fetchPreviewList(query: string): Promise<string[]> {
        return []
    }
}