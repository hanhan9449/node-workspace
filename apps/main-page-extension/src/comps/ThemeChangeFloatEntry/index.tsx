import {makeStyles, Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger} from "@fluentui/react-components";
import {useThemeOption} from "../../hooks/useThemeOption";
import {llocalStorage} from "../../tools/storage";
import {StorageKey} from "../../tools/storage-key";

const useStyles = makeStyles({
    floatEntry: {
        position: 'fixed',
        right: '20px',
        bottom: '20px',
    }
})
export function ThemeChangeFloatEntry() {
    const classes = useStyles()
    const {setTheme, currentTheme, themeOptions} = useThemeOption()
    function handleClickItem(next: typeof currentTheme) {
        setTheme(next)
    }
    return <div className={classes.floatEntry}>
        <Menu>
            <MenuTrigger>
                <MenuButton >{currentTheme}</MenuButton>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    {themeOptions.map(it => (
                        <MenuItem onClick={() => handleClickItem(it)} key={it}>{it}</MenuItem>
                    ))}
                </MenuList>
            </MenuPopover>
        </Menu>
    </div>
}