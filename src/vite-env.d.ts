/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly PLAYWRIGHT_PATH: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}