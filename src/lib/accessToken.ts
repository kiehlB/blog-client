let refresh_token = '';

export const setrefresh_token = (s: string) => {
  refresh_token = s;
};

export const getrefresh_token = () => {
  return refresh_token;
};
