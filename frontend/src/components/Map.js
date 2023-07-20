import React, { useContext, useEffect, useRef } from "react";
import MyContext from "./MyContext";

const Map = ({ center }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const addressRef = useRef();

  const { handleLocation } = useContext(MyContext);

  useEffect(() => {
    const { kakao } = window;
    if (kakao && kakao.maps && kakao.maps.services) {
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(center.latitude, center.longitude),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      const addressElement = addressRef.current;

      // 이전 마커를 제거하는 함수
      const removeMarker = () => {
        if (markerRef.current) {
          markerRef.current.setMap(null);
          markerRef.current = null;
        }
      };

      const updateAddress = (newCenter) => {
        handleLocation(newCenter.getLat(), newCenter.getLng());

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          newCenter.getLng(),
          newCenter.getLat(),
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // addressElement가 존재할 때만 innerHTML 속성을 설정합니다.
              if (addressElement) {
                addressElement.current.innerHTML = `주소: ${result[0].address.address_name}`;
              }
            }
          }
        );
      };

      // 지도 클릭 시, 마커 제거 후 새 마커 생성
      kakao.maps.event.addListener(map, "click", (mouseEvent) => {
        const newCenter = mouseEvent.latLng;
        removeMarker();
        const markerPosition = new kakao.maps.LatLng(
          newCenter.getLat(),
          newCenter.getLng()
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        markerRef.current = marker;
        updateAddress(newCenter);
      });

      // 초기 지도 생성 시, 중심 위치에 마커 생성
      const markerPosition = new kakao.maps.LatLng(
        center.latitude,
        center.longitude
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
      markerRef.current = marker;
      updateAddress(markerPosition);
    }
  }, [center, handleLocation]);

  return (
    <div className="flex flex-col items-center w-full">
      <div ref={addressRef} className="font-semibold text-lg mb-1" />
      <div ref={mapRef} className="w-full h-96" />
    </div>
  );
};

export default Map;
