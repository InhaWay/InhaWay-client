import { useEffect, useRef, useState } from 'react'
import { loadNaverMapScript } from '../../utils/naverMapLoader'
import  useGeolocation  from "../../hooks/useLocation";
import axios from 'axios';

// 임시 타입 세팅
interface Building {
  _id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface NaverMapProps {
  onBuildingsLoaded?: (buildings: Building[]) => void;
  selectedBuilding?: Building | null;
  routeQuery?: {start: string, end: string} | null;
}

const NaverMap = ({ onBuildingsLoaded, selectedBuilding, routeQuery }: NaverMapProps) => {
  const userMarkerRef = useRef<naver.maps.Marker | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);

  const [routePath, setRoutePath] = useState<any>(null);
  const polylineRef = useRef<any>(null);

  const { lat, lng, error } = useGeolocation();

  // 폴리라인 lat, lng 값 호출하기
  useEffect(() => {
    if (!routeQuery){
      setRoutePath(null);
      return;
    }
    if (!isLoaded) return;

    const routeKey = `${routeQuery?.start}-${routeQuery?.end}`;
    console.log("경로 조회 : ", routeQuery);

    axios
      .get(`http://localhost:5000/api/routes/${routeKey}`)
      .then((res) => {
        if (res.data.success) {
          setRoutePath(res.data.data);
        } else {
          console.log("해당 경로를 찾을 수 없습니다.");
        }
      })
      .catch((err) => {
        console.error("경로 없음", err);
      });
  }, [routeQuery, isLoaded]);

  // 폴리라인 그리기
  useEffect(() => {
    if (!routePath) {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
        console.log("폴리라인 제거됨");
      }
      return; 
    }
    if (!mapInstanceRef.current) return;

    console.log("폴리라인 그리기 시작");

    // 기존 폴리라인 제거
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      console.log("이전 폴리라인 제거");
    }

    // path 배열을 네이버 LatLng로 변환
    const pathCoords = routePath.path
      .sort((a: any, b: any) => a.order - b.order) // order 순서대로 정렬
      .map((point: any) => new (window as any).naver.maps.LatLng(point.lat, point.lng));

    console.log("📍 좌표 개수:", pathCoords.length);

    // Polyline 생성
    const polyline = new (window as any).naver.maps.Polyline({
      map: mapInstanceRef.current,
      path: pathCoords,
      strokeColor: "#5347AA", // 보라색
      strokeWeight: 5, // 굵기
      strokeOpacity: 0.8, // 투명도
      strokeStyle: "solid", // 실선
    });

    polylineRef.current = polyline;

    // 출발지 중심으로 지도 이동
    const startPos = new (window as any).naver.maps.LatLng(
      routePath.start_building.coordinates.lat,
      routePath.start_building.coordinates.lng
    );

    mapInstanceRef.current.setCenter(startPos);
    mapInstanceRef.current.setZoom(19);

    console.log("폴리라인 그리기 완료!");
  }, [routePath]);

  // 네이버 지도 스크립트 로드
  useEffect(() => {
    loadNaverMapScript()
      .then(() => setIsLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  // 건물 데이터 로드
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/buildings");
        console.log("api response", res.data);

        if (res.data.success) {
          setBuildings(res.data.data);
          onBuildingsLoaded?.(res.data.data);
          console.log("건물 개수:", res.data.data.length);
        }
      } catch (err) {
        console.error("건물 데이터 로드 실패:", err);
      }
    };
    fetchBuildings();
  }, []);

  // 지도 초기화 및 마커 설정
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    const centerPosition = new window.naver.maps.LatLng(37.447935, 126.657529);

    const mapOptions = {
      center: centerPosition,
      zoom: 17,
      minZoom: 13,
      maxZoom: 20,
    };
    const map = new naver.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = map;

    buildings.forEach((building) => {
      const markerPosition = new naver.maps.LatLng(building.coordinates.lat, building.coordinates.lng);
      const marker = new naver.maps.Marker({
        position: markerPosition,
        map: map,
        title: building.name,
      });
      console.log("마커 생성:", building.name);
    });
  }, [isLoaded, buildings]);

  // 입력 건물로 지도 이동
  useEffect(() => {
    if (!selectedBuilding || !mapInstanceRef.current) return;

    const targetPosition = new window.naver.maps.LatLng(
      selectedBuilding.coordinates.lat,
      selectedBuilding.coordinates.lng
    );
    mapInstanceRef.current.setCenter(targetPosition);
    mapInstanceRef.current.setZoom(19); // 줌 확대
  }, [selectedBuilding]);

  useEffect(() => {
    if (!mapInstanceRef.current || lat === null || lng === null || error) return;

    const map = mapInstanceRef.current;

    // 네이버 지도 좌표 객체 생성
    const userPosition = new naver.maps.LatLng(lat, lng);

    if (!userMarkerRef.current) {
      // 1. 마커가 없으면 (최초 1회 실행): 사용자 위치 마커 생성
      console.log("현재 위치 마커 생성");

      userMarkerRef.current = new naver.maps.Marker({
        position: userPosition,
        map: map,
        title: "내 위치",
        icon: {
          content:
            '<div style="background:red; border-radius:50%; width:16px; height:16px; border:2px solid white;"></div>',
          anchor: new naver.maps.Point(8, 8),
        },
      });

      // 처음 위치를 가져오면 지도의 중심을 현재 위치로 이동 (옵션)
      map.setCenter(userPosition);
      map.setZoom(17);
    } else {
      // 2. 마커가 이미 있으면 (watchPosition으로 위치가 업데이트될 때마다 실행): 위치만 업데이트
      console.log("현재 위치 마커 업데이트");
      userMarkerRef.current.setPosition(userPosition);
    }
  }, [lat, lng, mapInstanceRef.current, error]);
  return (
    <div className="w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};


export default NaverMap;
