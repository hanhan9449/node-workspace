import React, {useLayoutEffect, useMemo, useState} from "react";
import {
    Button,
    Checkbox,
    FluentProvider, makeStaticStyles,
    makeStyles, shorthands,
    teamsDarkTheme,
    teamsLightTheme,
    tokens
} from "@fluentui/react-components";
import {syncStorage} from "../../tools/storage";
import {StorageKey} from "../../tools/storage-key";
import {DEBUG} from "../../tools/simple-logger";
import {useThemeOption} from "../../hooks/useThemeOption";

const useStaticStyles = makeStaticStyles({
    ':is(body,html)': {
        padding: '0px',
        margin: '0px'
    }
})

const useStyles = makeStyles({
    panel: {
        width: '200px',
        height: '100px',
        ...shorthands.padding('8px'),
        backgroundColor: tokens.colorNeutralBackground1
    },
    title: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase600,
        marginBottom: '4px'
    }
})
export function App() {
    useStaticStyles()
    const classes = useStyles()
    const [state, setState] = useState(false)
    useLayoutEffect(() => {
        (async () => {
            const bool =await syncStorage.get(StorageKey.IS_BYTEDANCE_USER)
            setState(bool as boolean)
        })()
    }, [])
    function handleBytedanceBoolChange(next: boolean) {
        setState(next)
        syncStorage.set(StorageKey.IS_BYTEDANCE_USER, next)
    }
    const {currentTheme} = useThemeOption()
    const fluentTheme = useMemo(() =>{
        switch (currentTheme) {
            case "暗色 dark": return teamsDarkTheme
            case "亮色 light":
            default:
                return teamsLightTheme
        }
    }, [currentTheme])
    return (
        <FluentProvider theme={fluentTheme}>
        <div className={classes.panel}>
            <div className={classes.title}>一些个性设置</div>
            <Checkbox checked={state} onChange={(ev, data) => handleBytedanceBoolChange(!!data.checked)} label={'我是字节员工'}/>
        </div>
        </FluentProvider>
    )
}