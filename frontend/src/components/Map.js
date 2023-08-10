import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "./MyContext";

// 전역 스코프에서 kakao 객체를 선언
const { kakao } = window;

const Map = ({ center }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const addressRef = useRef(null);
  const { handleLocation } = useContext(MyContext);
  const [depth, setDepth] = useState(3);

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
          if (addressRef.current) {
            addressRef.current.innerHTML = `주소: ${result[0].address.address_name}`;
          }
        }
      }
    );
  };

  useEffect(() => {
    if (!kakao) {
      alert("Kakao 지도 API가 로드되지 않았습니다.");
      return;
    }

    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(center.latitude, center.longitude),
      level: depth,
    };
    const map = new kakao.maps.Map(container, options);

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

    kakao.maps.event.addListener(map, "zoom_changed", () => {
      setDepth(map.getLevel());
    });
  }, [center, handleLocation]);

  return (
    <div className="flex flex-col items-center w-full">
      <div ref={addressRef} className="font-semibold text-lg mb-1"></div>
      <div ref={mapRef} className="w-full h-96"></div>
    </div>
  );
};

export default Map;
