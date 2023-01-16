import path from "path";
import {OUTPUT_PATH} from "./utils.mjs";
import Zip from 'adm-zip'
export async function release(key) {
    const zip = new Zip()
    zip.addLocalFolder(path.resolve(OUTPUT_PATH,key))
    zip.writeZip(path.resolve(OUTPUT_PATH,`${key}.zip`))
}

