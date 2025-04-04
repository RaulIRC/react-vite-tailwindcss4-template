type UserInfo = {
  name?: string;
  profilePhoto?: string;
  userID?: string;
  isAuth?: boolean;
};

export const useGetUserInfo = (): UserInfo => {
  try{
      const storedAuth = localStorage.getItem("auth");
      if(storedAuth){
          const { name, profilePhoto, userID, isAuth } = JSON.parse(storedAuth) as UserInfo;
          return { name, profilePhoto, userID, isAuth };
      } else {
          return {};
      }

  } catch (error) {
      console.error("Error parsing auth from local storage", error);
      return {};
  }

};