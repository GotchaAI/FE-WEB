import RuruBackground from "assets/components/introduce/RuruBackground.png";
import MyoumyoBackground from "assets/components/introduce/MyoumyoBackground.png";
import WagwakBackground from "assets/components/introduce/WagwakBackground.png";
import BongvongBackground from "assets/components/introduce/BongvongBackground.png";
import BukbookBackground from "assets/components/introduce/BukbookBackground.png";
import { Bongvong } from "commons/svgs/characters/Bongvong";
import { Bukbook } from "commons/svgs/characters/Bukbook";
import { Myoumoy } from "commons/svgs/characters/Myoumoy";
import { Ruru } from "commons/svgs/characters/Ruru";
import { Wagwak } from "commons/svgs/characters/Wagwak";

export const character_info = [
  {
    index: 0,
    characterName: "루루",
    characterEngName: "Ruru",
    description: "토끼족의 수장이다. 토끼족을 이끌고 있다.",
    detail:
      "당돌한 토끼 루루. 평화로웠던 마을에서 당근농장을 하고 있다. \n어느날 갑자기 인공지능 묘묘에게 일자리를 뺏겨 곤란해지고 마는데...",
    svg: <Ruru />,
    background: RuruBackground,
  },
  {
    index: 1,
    characterName: "묘묘",
    characterEngName: "Myoumoy",
    description: "AI토공지능 로봇이다. 토끼족과 싸우는 것을 즐긴다.",
    detail:
      "토공지능 묘묘. 지능이 뛰어난 토끼들이 당근농사를 대신해줄 로봇을 만들었다. \n얼마나 성능이 뛰어난 지는 비밀이다.",
    svg: <Myoumoy />,
    background: MyoumyoBackground,
  },
  {
    index: 2,
    characterName: "왁왁",
    characterEngName: "Wagwak",
    description: "악어족의 귀요미왁. 악어족의 마지막 생존자다.",
    detail:
      "늪에 사는 왁왁씨. 왁왁하고 우는 게 아니라 -왁-은 입을 벌리는 소리다.",
    svg: <Wagwak />,
    background: WagwakBackground,
  },
  {
    index: 3,
    characterName: "봉봉",
    characterEngName: "Bongvong",
    description: "꽥꽥? 꽥꽥... 꽥꽥꽥꽥!!!!!",
    detail:
      "오리 봉봉씨. 텅 빈 연못에서 혼자서 멍때리는게 취미이다.",
    svg: <Bongvong />,
    background: BongvongBackground,
  },
  {
    index: 4,
    characterName: "북북",
    characterEngName: "Bukbook",
    description: "나....는........북......북이",
    detail:
      "북북씨. 무슨 일이 있든 항상 인자한 미소를 짓는 것이 특징이다. 하지만 무슨 일이 있어도 북북씨를 화내게 해서는 안된다.",
    svg: <Bukbook />,
    background: BukbookBackground,
  },
];
