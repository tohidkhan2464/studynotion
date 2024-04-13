import PersonalInformation from "./PersonalInformation";
import UpdatePassword from "./UpdatePassword";
import ChangeProfilePicture from "./ChangeDisplayPicture";
import DeleteProfile from "./DeleteProfile";

const Settings = () => {
  return (
    <div className="text-white w-11/12 desktop:ml-[15rem] desktop:w-9/12 max-w-maxContent flex flex-col items-center mx-auto my-12">
      <h1 className="text-4xl mobile:text-2xl font-semibold">Edit Profile</h1>

      {/* Section 1 Display Picture*/}
      <ChangeProfilePicture />

      {/* Section 2 Personal Information */}
      <PersonalInformation />

      {/* Section 3 Update Password */}
      <UpdatePassword />

      {/* Section 4 Delete profile */}
      <DeleteProfile />
    </div>
  );
};

export default Settings;
