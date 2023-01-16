import {buildEdgeExtension} from "./sub/build-edge-extension.mjs";
import {buildChromeExtension} from "./sub/build-chrome-extension.mjs";

export const releaseList = [
    {
        key: 'edge',
        buildFn: buildEdgeExtension,
    },
    {
        key: 'chrome',
        buildFn: buildChromeExtension
    }
]