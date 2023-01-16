import {mkdirOutputFolder, OUTPUT_PATH} from "../utils.mjs";
import shelljs from "shelljs";
import path from "path";
import fs from "fs";

export function buildChromeExtension() {
    const KEY = 'chrome';
    mkdirOutputFolder(KEY)

    shelljs.cp('-r', path.resolve( 'dist/src/pages'), path.resolve(OUTPUT_PATH,KEY))
    shelljs.cp('-r', path.resolve('dist/assets'), path.resolve(OUTPUT_PATH, KEY))

    const manifestJsPath = shelljs.ls(path.resolve(OUTPUT_PATH,KEY,'assets')).find(str => str.startsWith('manifest-' + KEY))
    const manifest = shelljs.exec('node '+path.resolve(OUTPUT_PATH,KEY,'assets',manifestJsPath))
    fs.writeFileSync(path.resolve(OUTPUT_PATH,KEY,'manifest.json'),manifest.toString())
}