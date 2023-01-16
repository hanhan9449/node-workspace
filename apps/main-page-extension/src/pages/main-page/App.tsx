import {useLayoutEffect, useMemo, useRef, useState} from "react";
import {syncStorage} from "../../tools/storage";
import {StorageKey} from "../../tools/storage-key";
import { DesktopChessPanel } from '../../comps/DesKtopChessPanel';
import './style.css'
import { SearchInput } from '../../comps/SearchInput';
import {Avatar, makeStyles, shorthands} from '@fluentui/react-components';
import icon from '../../assets/icon-512_512.jpg'
import {bufferTime, filter, fromEvent, map, mapTo} from "rxjs";

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
        transform: 'rotate(0turn)'
    },
    spinAvatar: {
        ...shorthands.transition('transform', '300ms', '0', 'ease'),
        transform: 'rotate(3turn)'
    }
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
    return <div>
        <DesktopChessPanel>
            <div className={classes.container}>
                <Avatar ref={avatarRef as any} size={128} image={{src: icon}} className={classes.avatar}></Avatar>
                <SearchInput />
            </div>
        </DesktopChessPanel>
    </div>
}
