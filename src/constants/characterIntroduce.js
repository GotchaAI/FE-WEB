import RuruBackground from "assets/components/introduce/RuruBackground.png";
import MyoumyoBackground from "assets/components/introduce/MyoumyoBackground.png";
import WagwakBackground from "assets/components/introduce/WagwakBackground.png";
import BongvongBackground from "assets/components/introduce/BongvongBackground.png";
import BukbookBackground from "assets/components/introduce/BukbookBackground.png";
const { Bongvong } = require("commons/svgs/characters/Bongvong");
const { Bukbook } = require("commons/svgs/characters/Bukbook");
const { Myoumoy } = require("commons/svgs/characters/Myoumoy");
const { Ruru } = require("commons/svgs/characters/Ruru");
const { Wagwak } = require("commons/svgs/characters/Wagwak");

export const character_info = [
  {
    index: 0,
    characterName: "루루",
    characterEngName: "Ruru",
    description: "토끼족의 수장이다. 토끼족을 이끌고 있다.",
    detail:
      "어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
    svg: <Ruru />,
    background: RuruBackground,
  },
  {
    index: 1,
    characterName: "묘묘",
    characterEngName: "Myoumoy",
    description: "AI토공지능 로봇이다. 토끼족과 싸우는 것을 즐긴다.",
    detail:
      "어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
    svg: <Myoumoy />,
    background: MyoumyoBackground,
  },
  {
    index: 2,
    characterName: "왁왁",
    characterEngName: "Wagwak",
    description: "악어족의 귀요미왁. 악어족의 마지막 생존자다.",
    detail:
      "어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
    svg: <Wagwak />,
    background: WagwakBackground,
  },
  {
    index: 3,
    characterName: "봉봉",
    characterEngName: "Bongvong",
    description: "꽥꽥? 꽥꽥... 꽥꽥꽥꽥!!!!!",
    detail:
      "어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
    svg: <Bongvong />,
    background: BongvongBackground,
  },
  {
    index: 4,
    characterName: "북북",
    characterEngName: "Bukbook",
    description: "나....는........북......북이",
    detail:
      "어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
    svg: <Bukbook />,
    background: BukbookBackground,
  },
];
