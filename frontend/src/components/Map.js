import React, { useContext, useEffect, useRef } from "react";
import MyContext from "./MyContext";

const Map = ({ center }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const addressRef = useRef(null);

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

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          newCenter.getLng(),
          newCenter.getLat(),
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              addressRef.current.innerHTML = `주소: ${result[0].address.address_name}`;
            }
          }
        );
      };

      kakao.maps.event.addListener(map, "center_changed", () => {
        const newCenter = map.getCenter();
        marker.setPosition(newCenter);
        updateAddress();
      });

      updateAddress();
    }
  }, [center, handleLocation]);

  return (
    <div className="flex flex-col items-center w-full">
      <div ref={addressRef} className=" font-semibold text-lg mb-1" />
      <div ref={mapRef} className=" w-full h-96" />
    </div>
  );
};

export default Map;
