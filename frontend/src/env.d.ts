/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB_SOCKETS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
