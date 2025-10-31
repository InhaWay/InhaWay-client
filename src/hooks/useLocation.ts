import { useState, useEffect } from 'react'

interface GeoLocationState {
  lat: number | null;
  lng: number | null;
  error: string | null;
}

const useGeolocation = () => {
  const [locationState, setLocationState] = useState<GeoLocationState>({
    lat: null,
    lng: null,
    error: null,
  })
  useEffect(() => {
    if(!navigator.geolocation) {
      console.error("현재 브라우저는 GeoLocation API를 지원하지 않습니다.");
      setLocationState(prev => ({
        ...prev,
        error: "현재 브라우저는 GeoLocation API를 지원하지 않습니다."
      }));
    }

    // 위치 요청 성공시 실행되는 콜백함수
    const successCallback = (postion: GeolocationPosition) => {
      const lat = postion.coords.latitude;
      const lng = postion.coords.longitude;

      console.log("사용자의 현재 위치 가져오기 성공");
      console.log(`위도 (Latitude): ${lat}, 경도 (Longitude): ${lng}`);

      setLocationState({lat,lng, error: null});
    };

    const errorCallback = (error: GeolocationPositionError) => {
      let errorMessage = `ERROR(${error.code}): ${error.message}`;
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage = "사용자가 위치 정보 접근을 거부했습니다.";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMessage = "위치 정보를 사용할 수 없습니다.";
      } else if (error.code === error.TIMEOUT) {
        errorMessage = "위치 요청 시간이 초과되었습니다.";
      }
      console.error(`useGeolocation: ${errorMessage}`);
      setLocationState(prev => ({
        ...prev,
        error: errorMessage,
      }));
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);
  return locationState;
};

export default useGeolocation;
