import type {EdgeManifestInterface} from "./type";
import {Const, PureConst} from "../const";
import icon16 from '../assets/icon-16_16.jpg'
import icon32 from '../assets/icon-32_32.jpg'
import icon48 from '../assets/icon-48_48.jpg'
import icon128 from '../assets/icon-128_128.jpg'
import icon512 from '../assets/icon-512_512.jpg'

export const edgeAndChromeManifest =  {
    manifest_version: 3,
    name: PureConst.NAME,
    short_name: PureConst.SHORT_NAME,
    version: PureConst.VERSION,
    description: Const.DESCRIPTION,
    author: PureConst.AUTHOR,
    icons: {
        "16": icon16,
        "32": icon32,
        "48": icon48,
        "128": icon128,
        "512": icon512,
    },
    chrome_url_overrides: {
        newtab: 'pages/main-page/index.html'
    },
    action: {
        title: PureConst.NAME,
        default_popup: 'pages/popup/index.html'
    },
    offline_enabled: true,
    permissions: ["storage"],
    "host_permissions": [
        "https://www.bing.com/*",
        "https://www.google.com/*"
    ],
} as EdgeManifestInterface
