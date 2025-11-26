import carrot from 'assets/commons/carrot.png';
import { signOutAPI } from 'services/auth/auth';
import useUserInformationStore from 'store/userInformation';
import 'styles/components/home/Profile.scss';

const Profile = () => {
  const profile = useUserInformationStore((state) => state.profile);
  const experience = useUserInformationStore((state) => state.experience);

  const signOutHandler = async () => {
    try {
      await signOutAPI();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="profile-container">
      <div className="exp-container">
        <progress
          className="exp-bar"
          value={experience.expProgress * 100}
          max="100"
        />
        <span className="exp-text">
          EXP.{experience.expInLevel} [
          {(experience.expProgress * 100).toFixed(1)}%]
        </span>
      </div>
      <div className="profile-user-info-container">
        <div className="profile-img-container">
          <img src={carrot} alt="프로필 사진" />
        </div>
        <div className="profile-detail-container">
          <div className="profile-detail">
            <span className="nickname">{profile.nickname}</span>
            <div className="ranking-container">
              <div className="left-strip" />
              <span>{experience.level} LV</span>
            </div>
          </div>
        </div>
      </div>

      <button className="sign-out-btn" type="button" onClick={signOutHandler}>
        로그아웃
      </button>
    </div>
  );
};

export default Profile;
