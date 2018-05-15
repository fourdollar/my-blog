var UserSQL = {
                insert:'INSERT INTO user(username, password, email) VALUES(?,?,?)',
              	update:'update user set username=?, password=? , email=? where id=?',
              	delete: 'delete from user where id=?',
              	queryByName: 'select * from user where username=?',
              	queryAll: 'select * from user'
              };
 module.exports = UserSQL;
