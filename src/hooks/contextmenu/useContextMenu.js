import { useState } from "react";
/**
 * useContextMenu
 * 컨텍스트 메뉴 로직을 추상화한 커스텀 훅
 *
 * 주요 기능
 * 1. isOpen: 컨텍스트 메뉴가 열려 있는지 여부를 boolean 값으로 관리
 * 2. menus: 메뉴 항목(label과 action을 포함한 객체 배열)을 상태로 관리
 * 3. position: 마우스 클릭 또는 트리거 지점의 화면 좌표(x, y)를 기준으로 메뉴 위치 지정
 * 4. openMenu(x, y, newMenus): 메뉴를 특정 좌표에 표시하며, 메뉴 항목 배열도 함께 설정
 * 5. closeMenu(): 메뉴를 닫고 상태를 초기화함
 *
 *
 * @returns {
 *   isOpen: boolean,
 *   menus: Array<{ label: string, action: Function }>,
 *   position: { x: number, y: number },
 *   openMenu: (x: number, y: number, menus: Array) => void,
 *   closeMenu: () => void
 * }
 */

const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const openMenu = (x, y, newMenus) => {
    setPosition({ x, y });
    setMenus(newMenus);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    menus,
    position,
    openMenu,
    closeMenu,
  };
};

export default useContextMenu;
