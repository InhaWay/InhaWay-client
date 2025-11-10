declare global {
  interface Window {
    naver : any;
  }
  const naver: typeof import("navermaps");
}

export {};