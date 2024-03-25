const usersServise = new UserService('https://jsonplaceholder.typicode.com/users', 'https://api.lorem.space/image/face?w=150&h=150');

async function usersApp() { 
    const users = await usersServise.requestAllUsers();
    usersServise.renderAllUsers(users);
}
 
usersApp(); 