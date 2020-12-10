import { SET_PROFILE_PIC } from './types';

export const setProfilePic = (image) => ({
  type: SET_PROFILE_PIC,
  data: image,
});
