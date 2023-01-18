import {PropsWithoutRef, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {
  Input,
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger, mergeClasses,
  shorthands, tokens
} from '@fluentui/react-components';
import {WithStyle} from '../../type';
import {SearchRegular} from '@fluentui/react-icons';
import {defaultSearchEngineBing} from "../../tools/search-engine/bing";
import {getUrlQuery, setUrlQuery} from "../../tools/setUrlQuery";
import googleLogo from '../../assets/google-logo.png'
import bingLogo from '../../assets/bing-logo.jpg'
import baiduLogo from '../../assets/baidu-logo.png'
import bytedanceLogo from '../../assets/bytedance-logo.png'
import {searchEngineFactory, SearchEngineNameType} from "../../tools/search-engine/factory";
import {llocalStorage, syncStorage} from "../../tools/storage";
import {StorageKey} from "../../tools/storage-key";
import {useDebounce} from "@hanhan9449/react-hooks";
import {DEBUG} from "../../tools/simple-logger";
import {useCompositionState} from "@hanhan9449/react-hooks";
import {useThemeOption} from "../../hooks/useThemeOption";

interface SearchInputProps extends WithStyle {
}
const useStyles = makeStyles({
  input: {
    ...shorthands.padding('12px', '30px'),
    ...shorthands.borderRadius('30px'),
    minWidth: '60vw',
    "::after": {
      borderBottomWidth: 0
    }
  },
  'input-after': {
    ':hover': {
      cursor: 'pointer'
    }
  },
  inputFocusWithPreview: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomWidth: 0
  },
  inputLogo: {
    height: '22px',
    display: "block"
  },
  previewList: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px',
    ...shorthands.padding('8px', '16px', '16px')
  },
  previewListItem: {
    ...shorthands.padding('12px', '8px'),
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2,
      cursor: 'pointer'
    }
  }
})

const baseList = [
  {
    name: 'google',
    key: 'google',
    icon: googleLogo
  },
  {
    name: 'bing',
    key: 'bing',
    icon: bingLogo
  },
  {
    name: 'baidu',
    key: 'baidu',
    icon: baiduLogo
  }
]
const bytedanceList = [
  {
    name: 'bytedance',
    key: 'bytedance',
    icon: bytedanceLogo
  }
]
export function SearchInput(props: PropsWithoutRef<SearchInputProps>) {
  const [isBytedanceUser, setIsBytedanceUser] = useState(false)
  const [searchEngine, setSearchEngine] = useState<SearchEngineNameType>()
  const [previewList, setPreviewList] = useState<string[]>([])
  const searchEngineInstance = useMemo(() => {
    return searchEngineFactory(searchEngine!)
  }, [searchEngine])
  useLayoutEffect(() => {
    (async () => {
      const bool = await syncStorage.get(StorageKey.IS_BYTEDANCE_USER)
      syncStorage.listen(StorageKey.IS_BYTEDANCE_USER, (next) => {
        setIsBytedanceUser(next)
      })
      setIsBytedanceUser(bool as boolean)
    })()
  }, [])
  const list = useMemo(() => {
    if (isBytedanceUser) {
      return [...baseList, ...bytedanceList]
    }
    return baseList
  }, [isBytedanceUser])
  useEffect(() => {
    if (!isBytedanceUser) {
      setSearchEngine('bing')
    }
  }, [isBytedanceUser])
  const {className, style} = props
  const classes = useStyles()
  const [query, setQuery] = useState(() => getUrlQuery('q') ?? '')

  let handleUpdatePreviewList = async (next: string) => {
    const list = await searchEngineInstance.fetchPreviewList(next)
    setPreviewList(list)
  };
  const handleUpdatePreviewListDebounced = useDebounce(handleUpdatePreviewList, 300)
  function handleInputValueChange(next: string) {
    setUrlQuery('q', next)
    setQuery(next)
    handleUpdatePreviewListDebounced(next)
  }
  function handleQuery() {
    if (!searchEngine) {
      return
    }
    searchEngineInstance.doSearch(query)
  }
  function handleInputFocus() {
    handleUpdatePreviewList(query)
    document.documentElement.setAttribute('show-mask','1')
  }
  function handleInputBlur() {
    // 关太快了会导致item的onClick未触发喵
    setTimeout(() => {
      setPreviewList([])
    }, 200)
    document.documentElement.setAttribute('show-mask', '0')
  }
  useLayoutEffect(() => {
    (async () => {
     const res =  await llocalStorage.get(StorageKey.SEARCH_ENGINE_OPTION)
      setSearchEngine((res ?? 'bing') as SearchEngineNameType)
    })()
  }, [])
  function renderIcon(engine: SearchEngineNameType) {
    const url = (() => {
      switch (engine) {
        case "google": return googleLogo
        case "bing":return bingLogo
        case "bytedance":return bytedanceLogo
        case "baidu":return baiduLogo
      }

    })()
    return <img src={url} className={classes.inputLogo}/>
  }

  function handleSearchEngineChange(next: SearchEngineNameType) {
    llocalStorage.set(StorageKey.SEARCH_ENGINE_OPTION, next)
    setSearchEngine(next)
  }

  const contentBefore = (<Menu>
    <MenuTrigger>
       <MenuButton icon={renderIcon(searchEngine!)} appearance={'transparent'}></MenuButton>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        {list.map(it => (
          <MenuItem onClick={() => handleSearchEngineChange(it.key as any)}>
            <div style={{display: 'flex', gap: 2}}>
              {renderIcon(it.key as SearchEngineNameType)}
              <div>{it.name}</div>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </MenuPopover>

  </Menu>)

  const inputRef = useRef<HTMLInputElement>(null)
  const [isUseInputTool] = useCompositionState(inputRef)

  const {currentTheme} = useThemeOption()

  return (<div className={className} style={style}>
      <Input
          size={'large'}
          style={{
            border: '1px solid #eee',
            borderColor: currentTheme === '暗色 dark' ? '#3a3a3a' : '#eee'
          }}
          ref={inputRef}
          contentBefore={contentBefore }
          contentAfter={<SearchRegular onClick={handleQuery} className={classes['input-after']} />}
          className={mergeClasses(classes.input, !!previewList.length && classes.inputFocusWithPreview)} type={'text'} placeholder={'Hello world...'}
          value={query}
          onKeyDown={e => {
            if (isUseInputTool) {
              return
            }
            if (e.key.toLowerCase() === 'enter') {
              handleQuery()
            }
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={(ev, data) => {
            handleInputValueChange(data.value);
          }}
      />
      {!!previewList.length && (
          <div className={classes.previewList}>
            {previewList.map(s => (
                <div key={s} onClick={() => {
                  searchEngineInstance.doSearch(s);
                }} className={classes.previewListItem}>{s}</div>
            ))}
          </div>
      )}
    </div>)
}
