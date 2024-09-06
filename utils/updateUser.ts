export const updateUser = (username: any, newPassword: any) => {
   const user = { username, password: newPassword }; 
   localStorage.setItem('user', JSON.stringify(user)); 
};

export const getUser = () => {
   const user = localStorage.getItem('user');
   return user ? JSON.parse(user) : null;
};