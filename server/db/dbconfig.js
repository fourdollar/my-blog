module.exports = {
    prod: {
        host: 'mybloginstance.cfkhlvoutd9s.ap-northeast-1.rds.amazonaws.com',
        user: 'fengsiyuan',
        password: 'ziqing2013',
        database: 'blogdb',
        port: '3306',
        dialect: "mysql",
        logging: false
    },
    dev: {
        host: '127.0.0.1',
        user: 'root',
        password: 'ziqing2013',
        database: 'blogdb',
        port: '3306',
        dialect: "mysql",
        logging: false
    }
}
