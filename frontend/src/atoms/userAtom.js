import { DefaultValue, atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-sprine")),
});

export default userAtom;
