import React, { useEffect, useRef } from 'react';

const Map = ({ latitude, longitude }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const { kakao } = window;
        if (typeof kakao !== 'undefined' && kakao.maps) {
            const container = mapRef.current;
            const options = {
                center: new kakao.maps.LatLng(latitude, longitude),
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);

            // 마커 생성
            const markerPosition = new kakao.maps.LatLng(latitude, longitude);
            const marker = new kakao.maps.Marker({
                position: markerPosition,
            });

            // 마커를 지도에 표시
            marker.setMap(map);
        }
    }, [latitude, longitude]);

    return (
        <div ref={mapRef} style={{ width: '300px', height: '200px' }}></div>
    );
};

export default Map;
