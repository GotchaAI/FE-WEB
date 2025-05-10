import rabbit from "assets/rabbit-sample.png";
import "styles/components/home/Profile.scss";

const Profile = () => {
  const userInfo = {
    exp: 1234,
    exp_percent: 59.0,
    nickname: "떡볶이먹고싶",
    profile_img: rabbit,
    rank: "1등",
  };

  return (
    <div className="profile-container">
      <div className="exp-container">
        <progress className="exp-bar" value={userInfo.exp_percent} max="100" />
        <span className="exp-text">
          EXP.{userInfo.exp}[{userInfo.exp_percent}%]
        </span>
      </div>
      <div className="profile-user-info-container">
        <div className="profile-img-container">
          <img src={userInfo.profile_img} alt="프로필 사진" />
        </div>
        <div className="profile-detail-container">
          <div className="profile-detail">
            <span className="nickname">{userInfo.nickname}</span>
            <div className="ranking-container">
              <div className="left-strip" />
              <span>{userInfo.rank}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
