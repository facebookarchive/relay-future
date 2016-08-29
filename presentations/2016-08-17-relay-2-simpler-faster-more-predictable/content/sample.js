const ProfilePic = ({name, uri}) => {
  return (
    <div class="profile-pic">
      <img alt={name} src={uri} title={name} />
    </div>
  );
};
