import config from 'config'

const API_URL = `${config.serverUrl}api/`
export const TOKEN_API_URL = `${API_URL}token/`
export const LOG_OUT_API_URL = `${API_URL}token/revoke/`
export const REFRESH_TOKEN_API_URL = `${API_URL}token/refresh/`
export const APP_CONFIG_API_URL = `${API_URL}app-config/`
export const RECENT_ITEMS_API_URL = `${API_URL}historical-data/recent-items/`
export const ANALYTIC_SUMMARY_API_URL = `${API_URL}analytics/summary/`
export const DEPARTMENTS_API_URL = `${API_URL}departments/`
export const OFFICERS_API_URL = `${API_URL}officers/`
export const DOCUMENTS_API_URL = `${API_URL}documents/`
export const SEARCH_API_URL = `${API_URL}search/`
