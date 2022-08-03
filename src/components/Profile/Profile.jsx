import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

function Profile() {
  const { user } = useSelector(userSelector);
  return (
    <div>Profile for user with id:{user.id} and username: {user.username} </div>
  );
}

export default Profile;
