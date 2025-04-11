import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const signInBtnHandler = async () => {
    navigate("signin");
  };

  return (
    <div className="home-page-container">
      home페이지
      <button onClick={signInBtnHandler}>로그인</button>
    </div>
  );
};

export default HomePage;
