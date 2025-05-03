import rabbit from "assets/rabbit-sample.png";
import "styles/components/home/Profile.scss";

const Profile = () => {
  const userInfo = {
    exp: 1234,
    exp_percent: 79.0,
    nickname: "떡볶이먹고싶",
    profile_img: rabbit,
    rank: "1등",
  };

  return (
    <div className="profile-container">
      <div className="exp-container">
        <div className="exp" style={{ width: `${userInfo.exp_percent}%` }}>
          EXP.{userInfo.exp}[{userInfo.exp_percent}%]
        </div>
      </div>
      <div className="profile-user-info-container">
        <div className="profile-img-container">
          <img src={userInfo.profile_img} />
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
