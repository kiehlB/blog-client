let refresh_token = '';
let access_token = '';
export const setRefresh_token = (s: string) => {
  refresh_token = s;
  access_token = s;
};

export const getRefresh_token = () => {
  return refresh_token;
};
