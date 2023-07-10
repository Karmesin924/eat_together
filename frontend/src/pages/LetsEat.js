import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyContext from "../components/MyContext";
import Map from "../components/Map";

const LetsEat = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { people, gender, age, menu, conversation, handleSaveFilters } =
    useContext(MyContext);

  const handleStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const handleMatching = () => {
    alert("matching start!!");
    console.log("Selected Filters:", {
      people,
      gender,
      age,
      menu,
      conversation,
    });
  };

  const handleShowFilter = () => {
    axios
      .get("/api/filters")
      .then((res) => {
        const filters = res.data;
        handleSaveFilters(filters);
      })
      .catch((err) => {
        alert("기존 선택항목을 불러오는데 오류가 발생했습니다.");
        console.log(err);
      });
  };

  const handleSelectFilter = () => {
    navigate("/FilterDetail");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      const options = { enableHighAccuracy: true };

      const successCallback = (position) => {
        const { latitude, longitude } = position.coords;
        const accuracy = position.coords.accuracy;

        if (accuracy <= 100) {
          setLatitude(latitude);
          setLongitude(longitude);
          setMapLoaded(true); // 위치 정보가 정확하게 가져와지면 map을 로드할 수 있도록 상태 업데이트
        } else {
          navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
            options
          );
        }
      };

      const errorCallback = (error) => {
        console.log("위치 정보를 가져오는데 실패했습니다.", error);
      };

      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      console.log("Geolocation API가 지원되지 않습니다.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    axios
      .get("/users/validate")
      .then((res) => {
        if (res.status === 404) {
          alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
          navigate("/SignIn");
        }
      })
      .catch((err) => {
        console.log("로그인이 되어있습니다.");
      });
  }, [navigate]);

  useEffect(() => {
    const now = new Date();
    const nearestHour = Math.ceil(now.getMinutes() / 60) + now.getHours();

    const formattedStartTime = `${
      nearestHour < 10 ? "0" : ""
    }${nearestHour}:00`;

    setStartTime(formattedStartTime);
  }, []);

  return (
    <div>
      <div>
        <MyHeader
          headText={"같이 먹자"}
          leftChild={
            <MyButton
              text={"뒤로가기"}
              onClick={() => {
                navigate("/");
              }}
            />
          }
        />
        <div className="flex flex-col items-center pt-10">
          <div className="flex flex-row flex-wrap border-4 border-project rounded-xl w-1/2 flex-shrink-0">
            <div className="flex flex-col justify-center items-center m-auto w-64">
              <p className="flex font-bold text-3xl pt-3 pb-3">모임 날짜</p>

              <input
                className="flex text-center text-xl w-full text-red-500 font-semibold"
                type="text"
                placeholder="닉네임"
                value={new Date()
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "short",
                  })
                  .replace(/\./g, " /")}
                readOnly
              />
              <p className=" text-gray-500 pb-3">
                ※모임 날짜는 당일로 고정됩니다.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center m-auto w-64 flex-shrink-0">
              <p className="font-bold text-3xl pt-3 pb-3">시간 선택</p>
              <input
                className=" text-xl text-red-500 font-semibold"
                type="time"
                value={startTime}
                onChange={handleStartTime}
              />
              <p className=" text-gray-500 pb-3">※시간 변경이 가능합니다.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center m-auto border-4 border-project rounded-xl w-1/2 mt-5">
            <p className="font-bold text-3xl pt-3 pb-3">필터 선택</p>
            <div>
              <MyButton text={"불러오기"} onClick={handleShowFilter} />
              <span className="m-1" />
              <MyButton text={"필터선택"} onClick={handleSelectFilter} />
            </div>
            <p className="pt-3 text-xl font-semibold pb-2">현재 선택한 필터</p>
            <div className="text-xl pb-3">
              <p>
                <span className="font-bold">인원: </span>
                <span className=" text-red-500 font-semibold">{people}</span>
              </p>
              <p>
                <span className="font-bold">성별: </span>
                <span className=" text-red-500 font-semibold">{gender}</span>
              </p>
              <p>
                <span className="font-bold">나이: </span>
                <span className=" text-red-500 font-semibold">{age}</span>
              </p>
              <p>
                <span className="font-bold">메뉴: </span>
                <span className=" text-red-500 font-semibold">
                  {menu.join(", ")}
                </span>
              </p>
              <p>
                <span className="font-bold">대화빈도: </span>
                <span className=" text-red-500 font-semibold">
                  {conversation}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center m-auto border-4 border-project rounded-xl w-1/2 mt-5">
            <p className="font-bold text-3xl pt-3 pb-3">현재 위치</p>
            <p className=" text-gray-500 pb-3">
              ※현재 위치 기준으로 근처 인원이 매칭됩니다 :)
            </p>
            {latitude && longitude ? (
              <div>
                <p>
                  위도: {latitude}, 경도: {longitude},{" "}
                </p>
                {mapLoaded ? (
                  <Map latitude={latitude} longitude={longitude} />
                ) : (
                  <p>지도를 로딩 중입니다...</p>
                )}
              </div>
            ) : (
              <p>위치 정보를 가져오는 중...</p>
            )}
            <p className="pb-3" />
          </div>
          <p className="pb-3" />
          <MyButton text={"매칭 시작!!"} onClick={handleMatching} />
        </div>
      </div>
    </div>
  );
};

export default LetsEat;
