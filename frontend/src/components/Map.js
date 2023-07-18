import React, { useContext, useEffect, useRef } from "react";
import MyContext from "./MyContext";

const Map = ({ center }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

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

      kakao.maps.event.addListener(map, "center_changed", () => {
        const newCenter = map.getCenter();
        markerRef.current.setPosition(newCenter);

        handleLocation(newCenter.getLat(), newCenter.getLng());
      });
    }
  }, [center]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
