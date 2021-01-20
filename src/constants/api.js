import config from 'config'

const API_URL = `${config.serverUrl}api/`
export const TOKEN_API_URL = `${API_URL}token/`
export const REFRESH_TOKEN_API_URL = `${API_URL}token/refresh/`
export const APP_CONFIG_API_URL = `${API_URL}app-config/`
export const DOCUMENT_API_URL = `${API_URL}documents/`
