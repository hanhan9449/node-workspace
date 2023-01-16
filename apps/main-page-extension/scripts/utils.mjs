import shelljs from "shelljs";
import path from "path";

// 请不要直接调用~~~，root取值仅为根目录调用时准确
export const root = '.'
export const OUTPUT_PATH = 'output'
export function clearOutPutFolder() {
    shelljs.rm('-rf', path.resolve(root, OUTPUT_PATH))
}
export function mkdirOutputFolder(...next) {
    shelljs.mkdir(path.resolve(root, OUTPUT_PATH, ...next))
}