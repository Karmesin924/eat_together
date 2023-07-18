import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "./MyContext";

const Map = ({ center }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [address, setAddress] = useState("");

  const { handleLocation } = useContext(MyContext);
  useEffect(() => {
    const { kakao } = window;
    if (typeof kakao !== "undefined" && kakao.maps) {
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(center.latitude, center.longitude),
        level: 3,
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

      const updateAddress = () => {
        const newCenter = marker.getPosition();
        handleLocation(newCenter.getLat(), newCenter.getLng());
      };

      kakao.maps.event.addListener(map, "center_changed", () => {
        const newCenter = map.getCenter();
        marker.setPosition(newCenter);
        updateAddress(); // 마커 위치가 변경될 때 주소 정보 업데이트
      });
    }
  }, [center, handleLocation]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default Map;
