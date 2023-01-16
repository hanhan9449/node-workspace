import { useMousePosRef } from '@hanhan9449/react-hooks';
import {
  FunctionComponent,
  FunctionComponentFactory,
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef
} from 'react';
import './style.css'
import classNames from 'classnames';
import {makeStyles} from "@fluentui/react-components";

const useStyles = makeStyles({
  wrap: {
    transform: 'translate(0)'
  }
})
export function DesktopChessPanel(props: PropsWithChildren) {
  const mousePosRef = useMousePosRef()
  const classes = useStyles()
  const panelRef = useRef<HTMLDivElement>()
  useLayoutEffect(() => {
    function animate() {
      requestAnimationFrame(animate)
      if (!panelRef.current) return

      const M = 20

      panelRef.current?.style.setProperty('--x', String(mousePosRef.current.xPercent * M) + 'px')
      panelRef.current?.style.setProperty('--y', String(mousePosRef.current.yPercent * M) + 'px')

    }
    animate()
  }, [])
  return <>
      <div className={'panel'} ref={panelRef as any}/>
      <div className={classes.wrap}>
        {props.children}
      </div>
  </>
}
