import {mkdirOutputFolder, OUTPUT_PATH, root} from "../utils.mjs";
import shelljs from "shelljs";
import path from "path";
import * as fs from "fs";

export function buildEdgeExtension() {
    const EDGE = 'edge';
    mkdirOutputFolder(EDGE)

    shelljs.cp('-r', path.resolve( 'dist/src/pages'), path.resolve(OUTPUT_PATH,EDGE))
    shelljs.cp('-r', path.resolve('dist/assets'), path.resolve(OUTPUT_PATH, EDGE))

    const manifestJsPath = shelljs.ls(path.resolve(OUTPUT_PATH,EDGE,'assets')).find(str => str.startsWith('manifest-edge'))
    const manifest = shelljs.exec('node '+path.resolve(OUTPUT_PATH,EDGE,'assets',manifestJsPath))
    fs.writeFileSync(path.resolve(OUTPUT_PATH,EDGE,'manifest.json'),manifest.toString())

}