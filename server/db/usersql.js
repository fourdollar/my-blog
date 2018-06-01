var UserSQL = {
                insert:'INSERT INTO users(username, password, email) VALUES(?,?,?)',
              	update:'update users set username=?, password=? , email=? where id=?',
              	delete: 'delete from users where id=?',
              	queryByName: 'select * from users where username=?',
              	queryAll: 'select * from users'
              };
 module.exports = UserSQL;
