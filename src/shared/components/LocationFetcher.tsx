import { useEffect } from 'react'

const LocationFetcher = () => {
  useEffect(() => {
    if(navigator.geolocation) {
      console.log("GeoLocation API 지원 확인");

      navigator.geolocation.getCurrentPosition (
        // 위치 요청 성공 여부에 따른 콜백 함수
        (position) => {
          const lat = position.coords.latitude // 위도
          const lng = position.coords.longitude // 경도

          console.log("사용자 현재 위치 가져오기 성공!");
          console.log(`위도 (Latitude): ${lat}`);
          console.log(`경도 (Longitude): ${lng}`);
        }, 
        (error) => {
          console.error("현재 위치 가져오기 실패", error.message);
          if (error.code === error.PERMISSION_DENIED) {
            console.warn("이유: 사용자가 위치 정보 접근을 거부했습니다.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            console.warn("이유: 위치 정보를 사용할 수 없습니다.");
          } else if (error.code === error.TIMEOUT) {
            console.warn("이유: 위치 요청 시간이 초과되었습니다.");
          }
        }
      )
    }
  }, [])

  return null;
}

export default LocationFetcher
