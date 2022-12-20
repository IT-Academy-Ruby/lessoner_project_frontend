/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    REACT_APP_BACKEND_URL: string
    REACT_APP_FACEBOOK_ID: string
    REACT_APP_GOOGLE_ID: string
    REACT_APP_REDIRECT_URL: string
    REACT_APP_VK_ID: number
  }
}