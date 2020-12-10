import { SET_PROFILE_PIC } from './actionTypes';

export const setProfilePic = (image) => ({
  type: SET_PROFILE_PIC,
  data: image,
});
