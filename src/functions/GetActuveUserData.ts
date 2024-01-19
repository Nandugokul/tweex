type user = {
    loggedInUserId:string;
    loggedInUserMail:string;
    loggedInUserName:string
}

function getActiveUser(): user | null {  
    const localStorageData = localStorage.getItem("activeUser");
  
    if (localStorageData) {
      try {
        const parsedActiveUser = JSON.parse(localStorageData);
        return parsedActiveUser;
      } catch (error) {
        console.error("Error parsing activeUser data from localStorage:", error);
        return null;  
      }
    } else {
      return null;  
    }
  }
  
  export default getActiveUser;
  