/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string
  readonly [key: string]: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
