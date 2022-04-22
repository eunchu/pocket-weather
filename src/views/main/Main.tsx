import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
// import { useRecoilState } from "recoil";

// import { cookieState } from "@store/state";

import MainPresenter from "./Main.presenter";

const Main = () => {
  // recoil state 가져오기
  // const [state, setState] = useRecoilState(cookieState);
  // console.log("recoil=", state);

  /**
   * NOTE State
   * @cityName : 선택 된 지역명 (Default: Seoul)
   * @coordinate : 지역의 좌표값
   */
  const [cityName, setCityName] = useState<string>("Seoul");
  const [coordinate, setCoordinate] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });
  const [weekInfo, setWeekInfo] = useState<
    Map<
      string,
      {
        dayOfTheWeek: string;
        day: string;
        state: string;
        min: number;
        max: number;
      }
    >
  >(new Map());

  // NOTE weather api key
  const apiKey = "cb6302cd5c4fb36a8493f603e55cb4ae";

  // NOTE [API] 선택 된 지역에 맞는 좌표 호출
  const {
    isLoading: isGetCoordLoading,
    refetch: getCoord,
    status,
    error,
    isFetching,
  } = useQuery(
    "getCoord",
    async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        setCoordinate({ lat: data[0].lat, lon: data[0].lon });
      },
    }
  );
  useEffect(() => {
    getCoord();
  }, [cityName]);

  // NOTE [API] 좌표에 맞는 날씨 데이타 호출
  const {
    isLoading: isGetWeatherLoading,
    refetch: getWeather,
    data: weatherData,
  } = useQuery("getWeather", async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`
    );
    return data;
  });

  // NOTE [API] 5일간의 날씨 데이타 호출
  const { data: getWeek } = useQuery(
    "get5Weather",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const tempsByDay = data.list.reduce(
          (
            acc: Map<
              string,
              {
                dayOfTheWeek: string;
                day: string;
                state: string;
                min: number;
                max: number;
              }
            >,
            {
              dt_txt,
              weather,
              main,
            }: {
              dt_txt: string;
              main: { temp: number };
              weather: { main: string }[];
            }
          ) => {
            const key = dt_txt.split(" ")[0];
            const target = acc.get(key);

            if (!target)
              acc.set(key, {
                dayOfTheWeek: moment(key).format("ddd"),
                state: weather[0].main,
                day: key.slice(5),
                min: main.temp,
                max: main.temp,
              });
            else {
              acc.set(key, {
                ...target,
                state: weather[0].main,
                min: Math.round(Math.min(target.min, main.temp)),
                max: Math.round(Math.max(target.min, main.temp)),
              });
            }

            return acc;
          },
          new Map()
        );
        setWeekInfo(tempsByDay);
      },
    }
  );

  // console.log("api key", import.meta.env.VITE_API_KEY);

  return (
    <MainPresenter cityName={cityName} data={weatherData} weekInfo={weekInfo} />
  );
};

export default Main;
