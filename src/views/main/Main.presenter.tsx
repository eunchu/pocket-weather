import styled from "styled-components";
import moment from "moment";

import WeatherImg from "@img/weather.png";
import LocationD from "@img/ic-location-dark.png";

const Container = styled.main`
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: #f7f6f4;
`;
const WeatherImgArea = styled.section`
  height: 0;

  display: flex;
  justify-content: center;
  flex-grow: 1;
`;
const RegionArea = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  margin-bottom: 30px;
  margin-left: 4%;

  img {
    width: 30px;
    margin-right: 10px;
  }
  h1.region {
    font-weight: 500;
    font-size: 24px;
  }
  span.desc {
    opacity: 0.8;
  }
`;
const MainInfoArea = styled.section`
  margin-bottom: 20px;
  margin-left: 4%;

  h2.state {
    font-size: 30px;
    font-weight: 700;
  }
  p.temp {
    font-size: 26px;
  }
`;
const WeekInfoArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 4%;
`;
const WeekBox = styled.section`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;

  h3 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  p.day {
    font-size: 11px;
  }
  p.state {
    font-size: 16px;
    margin: 8px 0;
  }
`;

interface Props {
  cityName: string;
  data: {} | any;
  weekInfo: Map<
    string,
    { dayOfTheWeek: string; day: string; min: number; max: number }
  >;
}
const Main = ({ cityName, data, weekInfo }: Props) => {
  return (
    <Container>
      {/* TODO 날씨별 이미지 변경 */}
      <WeatherImgArea>
        <img src={WeatherImg} alt="" />
      </WeatherImgArea>
      {/* TODO 지역 클릭해서 변경 가능하도록 */}
      <RegionArea>
        <img src={LocationD} alt="" />
        <div>
          <h1 className="region">{cityName}</h1>
          <span className="desc">
            {moment().format("YYYY-MM-DD h:mm")} updated.
          </span>
        </div>
      </RegionArea>
      <MainInfoArea>
        <h2 className="state">{data?.weather[0].main}</h2>
        <p className="temp">{Math.round(data?.main.temp)}°</p>
      </MainInfoArea>
      <WeekInfoArea>
        {[...weekInfo.values()].map((info) => (
          <WeekBox key={info.day}>
            <h3>{info.dayOfTheWeek}</h3>
            <p className="day">{info.day}</p>
            <img src="" alt="" className="weather-icon" />
            <p className="state">clouds</p>
            <p className="temp">
              {info.min}° - {info.max}°
            </p>
          </WeekBox>
        ))}
      </WeekInfoArea>
    </Container>
  );
};

export default Main;
