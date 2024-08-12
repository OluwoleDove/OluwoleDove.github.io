// authActions.js
export const checkAuthentication = () => {
    // Check if the user is authenticated
    const token = localStorage.getItem('authToken'); // Example: token stored in localStorage
    return token ? true : false;
};
