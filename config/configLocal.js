module.exports = {
    contextPath: "/DXHQuestServer",
    db: {
        dbName: "",
        user: "",
        password: "",
        config: {
            host: '',
            dialect: 'mysql',
            define: {
                timestamps: false,
                raw: true,
                logging: true,
                plain: false
            },
            pool: {
                max: 100,
                min: 0,
                idle: 10000
            }
        }

    },
    oss: {
        accessKeyId: "",
        accessKeySecret: "",
        bucket: "",
        region: "oss-cn-qingdao"
    }
};