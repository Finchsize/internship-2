const parseJwt = (token: string | undefined) => {
  if (token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error(e)
      return undefined;
    }
  }
  return undefined;
};

export default parseJwt;
