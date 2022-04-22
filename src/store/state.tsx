import { atom } from "recoil";

export const cookieState = atom({
  key: "cookieState",
  default: [], // 기본으로 atom에 저장되는 값이 들어감
});
