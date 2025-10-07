export const loadNaverMapScript = (): Promise<void> => {
  return new Promise((res, rej) => {
    if(window.naver && window.naver.maps) {
      res();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${import.meta.env.VITE_NAVER_MAP_CLIENT_ID}`;
    script.async = true; // 비동기 로드 설정

    script.onload = () => {
      res();
    }
    script.onerror = () => {
      rej(new Error("네이버 맵 스크립트 로드 실패"));
    }
    document.head.appendChild(script);
  })
}