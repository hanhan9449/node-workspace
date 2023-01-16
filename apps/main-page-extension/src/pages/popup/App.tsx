import {useLayoutEffect, useState} from "react";
import {Button, Checkbox, makeStyles, tokens} from "@fluentui/react-components";
import {syncStorage} from "../../tools/storage";
import {StorageKey} from "../../tools/storage-key";
import {DEBUG} from "../../tools/simple-logger";

const useStyles = makeStyles({
    panel: {
        width: '200px',
        height: '100px'
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
    return (
        <div className={classes.panel}>
            <div className={classes.title}>一些个性设置</div>
            <Checkbox checked={state} onChange={(ev, data) => handleBytedanceBoolChange(!!data.checked)} label={'我是字节员工'}/>
        </div>
    )
}