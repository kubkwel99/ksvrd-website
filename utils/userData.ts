interface User {
   username: string;
   password: string;
}

let user: User = {
   username: 'admin',
   password: 'pionier21',
};

export const getUser = (): User => user;

export const updateUser = (newUsername: string, newPassword: string): void => {
   user.username = newUsername;
   user.password = newPassword;
};
