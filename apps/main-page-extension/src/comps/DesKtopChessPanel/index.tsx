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
import {makeStyles, mergeClasses, tokens} from "@fluentui/react-components";
import {useThemeOption} from "../../hooks/useThemeOption";

const useStyles = makeStyles({
  wrap: {
    transform: 'translate(0)'
  },
  chessPanel: {
    backgroundColor: tokens.colorNeutralBackground1,
    '--p-color': tokens.colorNeutralStencil1
  },
  chessPanelDark: {
    backgroundColor: tokens.colorNeutralBackground1,
    '--p-color': tokens.colorNeutralStencil2
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
  const {currentTheme} = useThemeOption()
  return <>
      <div className={mergeClasses('panel', classes.chessPanel, currentTheme === '暗色 dark' && classes.chessPanelDark)} ref={panelRef as any}/>
      <div className={classes.wrap}>
        {props.children}
      </div>
  </>
}
