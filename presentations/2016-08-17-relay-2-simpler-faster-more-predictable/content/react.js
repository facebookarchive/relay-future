const ProfilePic = ({name, profilePic}) => {
  return (
    <div class="profile-pic">
      <img alt={name} src={profilePic} title={name} />
    </div>
  );
};
