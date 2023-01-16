import shelljs from 'shelljs'
import * as path from "path";
import {buildEdgeExtension} from "./sub/build-edge-extension.mjs";
import {clearOutPutFolder, mkdirOutputFolder} from "./utils.mjs";
import {release} from "./release.mjs";
import {releaseList} from "./release-list.mjs";


async function buildExtension() {
    clearOutPutFolder()
    mkdirOutputFolder()

    releaseList.forEach(it => {
        it.buildFn()
        release(it.key)
    })
}
await buildExtension()