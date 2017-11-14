const account =require('../services/account');
const userService = require('../services/users_service');
require('dotenv').load();

test('should returning a token', async() => {
  const user = {username: 'alexis@michelada.io', password: '12345678'}
  const result = await account.signUp(user);
  expect(result).toEqual({
    id: 2,
    full_name: 'Alexis omar',
    email: 'alexis@michelada.io',
    role: 'user',
    username: 'alexis@michelada.io',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZFVzZXIiOjIsInVzZXJuYW1lIjoiYWxleGlzQG1pY2hlbGFkYS5pbyIsImV4cCI6IlRvbW9ycm93IGF0IDEwOjIyIFBNIn0.-rPyPnuh7O-V527SxWjniIqAfJe0U-xXzWkVUwlFImE',
    expire: ''
  });
});

