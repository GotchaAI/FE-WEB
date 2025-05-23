import "styles/components/home/InformationContainer.scss";
export const InformationContainer = ({ data }) => {
  return (
    <ul className="information-content-layout">
      {data.map((item, idx) => (
        <li key={`${item.title}-${idx}`} className="info-item">
          <span className="title">{item.title}</span>
          <span className="date">{item.date}</span>
        </li>
      ))}
    </ul>
  );
};
