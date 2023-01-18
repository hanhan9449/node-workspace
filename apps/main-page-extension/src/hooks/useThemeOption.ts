import {useLayoutEffect, useState} from "react";
import {llocalStorage} from "../tools/storage";
import {StorageKey} from "../tools/storage-key";

type ThemeType = '亮色 light' | '暗色 dark' | '自动 auto'
export function useThemeOption() {
    const themeOptions: ThemeType[] = ['亮色 light', '暗色 dark', '自动 auto']
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('自动 auto')
    useLayoutEffect(() => {
        llocalStorage.get(StorageKey.THEME_COLOR).then(it => setCurrentTheme(it ?? 'auto'))
        llocalStorage.listen(StorageKey.THEME_COLOR, (next)=> {
            setCurrentTheme(next);
        })
    }, [])


    function setTheme(next: ThemeType) {
        llocalStorage.set(StorageKey.THEME_COLOR, next)
        setCurrentTheme(next)
    }

    return {
        currentTheme, themeOptions, setTheme
    }



}