type User = {
  loggedInUserId: string;
  loggedInUserMail: string;
  loggedInUserName: string;
};

function getActiveUser(): User | null {
  try {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      const localStorageData = localStorage.getItem('activeUser');

      if (localStorageData) {
        const parsedActiveUser = JSON.parse(localStorageData);
        return parsedActiveUser;
      }
    }

    return null;
  } catch (error) {
    console.error('Error parsing activeUser data from localStorage:', error);
    return null;
  }
}

export default getActiveUser;
