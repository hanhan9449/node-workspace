export function setUrlQuery(key: string, next: string) {
    const urlObj = new URL(location.href)
    urlObj.searchParams.set(key, next)
    history.replaceState(null, '', urlObj.toString())
}

export function getUrlQuery(key: string) {
    const urlObj = new URL(location.href)
    return urlObj.searchParams.get(key)
}