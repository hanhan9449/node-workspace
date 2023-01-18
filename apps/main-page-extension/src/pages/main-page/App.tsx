import {useLayoutEffect, useMemo, useRef, useState} from "react";
import {syncStorage} from "../../tools/storage";
import {StorageKey} from "../../tools/storage-key";
import { DesktopChessPanel } from '../../comps/DesKtopChessPanel';
import './style.css'
import { SearchInput } from '../../comps/SearchInput';
import {
    Avatar,
    FluentProvider,
    makeStyles,
    shorthands,
    teamsDarkTheme,
    teamsLightTheme
} from '@fluentui/react-components';
import icon from '../../assets/icon-512_512.jpg'
import {bufferTime, filter, fromEvent, map, mapTo} from "rxjs";
import {ThemeChangeFloatEntry} from "../../comps/ThemeChangeFloatEntry";
import {useThemeOption} from "../../hooks/useThemeOption";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: "column",
        alignItems:"center",
        height: '100vh'
    },
    avatar: {
        '--move': '1vw',
        marginTop: 'calc(20vh - var(--move))',
        marginBottom: 'calc(5vh + var(--move) * 3)',
        width: '10vw',
        minWidth: '128px',
        transform: 'rotate(0turn)',
    },
    spinAvatar: {
        ...shorthands.transition('transform', '300ms', '0', 'ease'),
        transform: 'rotate(3turn)'
    },
})
export function App() {
    const classes = useStyles()
    const avatarRef = useRef<HTMLElement>()
    useLayoutEffect(() => {
        if (!avatarRef.current) {
            return
        }
        const timeBuffer = fromEvent(avatarRef.current, 'click').pipe(
            map(it => 1),
            bufferTime(1000, null, 5),
            map(it => it.length),
            filter(it => it >= 5)
        )
        const id= timeBuffer.subscribe(it => {
            avatarRef.current!.classList.add(...classes.spinAvatar.split(' '))
            setTimeout(() => {
                avatarRef.current!.classList.remove(...classes.spinAvatar.split(' '))

            }, 300)
        })
        return () => id.unsubscribe()
    }, [])
    const {currentTheme} = useThemeOption()
    const fluentTheme = useMemo(() =>{
        switch (currentTheme) {
            case "暗色 dark": return teamsDarkTheme
            case "亮色 light":
            default:
                return teamsLightTheme
        }
    }, [currentTheme])
    return <div>
        <FluentProvider theme={fluentTheme}>
        <DesktopChessPanel>
            <div className={classes.container}>
                <Avatar draggable={false} ref={avatarRef as any} size={128} image={{src: icon}} className={classes.avatar}></Avatar>
                <SearchInput />
            </div>
            <ThemeChangeFloatEntry/>
        </DesktopChessPanel>
        </FluentProvider>
    </div>
}
