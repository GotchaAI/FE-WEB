import "styles/commons/contextmenu/ContextMenu.scss";

/**
 * ContextMenu
 * 마우스 클릭 발생 시 표시되는 커스텀 컨텍스트 메뉴 컴포넌트
 *
 * props:
 * - menus: [{ label: string, action: Function }] 형태의 메뉴 항목 배열
 * - position: { x: number, y: number } 형태의 화면 좌표 (e.clientX, e.clientY를 반환하면 됨)
 * - onClose: 메뉴 닫기 콜백 함수
 */

const ContextMenu = ({ menus, position, onClose }) => {
  const layoutHandler = () => {
    onClose && onClose();
  };
  return (
    <div className="context-menu-layout" onClick={layoutHandler}>
      <div
        className="context-menu-container"
        style={{ top: position.y, left: position.x }}
      >
        <ul className="context-menu-list">
          {menus.map((menu, idx) => (
            <li
              key={`contextmenu-${idx}`}
              className="context-menu-item"
              onClick={(e) => {
                e.stopPropagation();
                menu.action();
                onClose && onClose();
              }}
            >
              {menu.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContextMenu;
