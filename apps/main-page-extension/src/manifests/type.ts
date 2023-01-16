export type EdgeManifestInterface = {
    manifest_version: 3,
    name: string,
    short_name: string
    version: string
    description: string
    author: string
    icons: {
        '128': string,
        '512': string,
        '48': string
    }
    chrome_url_overrides: {
        'newtab': string
    }
    action: {
        title: string
    }
    offline_enabled: boolean
    background?: {
        service_worker: string
        type: 'module'
    }
    permissions: ('storage'|'unlimitedStorage'|'geolocation')[]
    optional_permissions?: []
    host_permissions: string[]
}