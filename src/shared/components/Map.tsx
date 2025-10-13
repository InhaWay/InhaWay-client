import { useEffect, useRef, useState } from 'react'
import { loadNaverMapScript } from '../../utils/naverMapLoader'

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadNaverMapScript()
    .then(() => setIsLoaded(true))
    .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // 7호관 좌표
    const centerPosition = new window.naver.maps.LatLng(37.449020, 126.657111);

    // 지도 옵션
    const mapOptions = {
      center: centerPosition,
      zoom: 17,
      minZoom: 13,
      maxZoom: 20,
    };
    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 테스트용 마커
    new window.naver.maps.Marker({
      position: centerPosition,
      map: map,
      title: "7호관",
    });
  }, [isLoaded]);

  return (
    <div className='w-full h-screen'>
      <div ref={mapRef} className='w-full h-[420px]' />
    </div>
  )
}


export default NaverMap;
