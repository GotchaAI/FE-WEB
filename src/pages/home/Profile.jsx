import rabbit from "assets/rabbit-sample.png";
import useUserInformationStore from "store/userInformation";
import "styles/components/home/Profile.scss";

const Profile = () => {
  const profile = useUserInformationStore((state) => state.profile);
  const experience = useUserInformationStore((state) => state.experience);
  return (
    <div className="profile-container">
      <div className="exp-container">
        <progress
          className="exp-bar"
          value={experience.expProgress * 100}
          max="100"
        />
        <span className="exp-text">
          EXP.{experience.expInLevel} [{experience.expProgress * 100}%]
        </span>
      </div>
      <div className="profile-user-info-container">
        <div className="profile-img-container">
          <img src={rabbit} alt="프로필 사진" />
        </div>
        <div className="profile-detail-container">
          <div className="profile-detail">
            <span className="nickname">{profile.nickname}</span>
            <div className="ranking-container">
              <div className="left-strip" />
              {/*<span>{userInfo.rank}</span> -> 빠른 시일 내로 자기 랭크와 총 점수 알려주는 api를 파주겠다고 함*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
