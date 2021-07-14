const sequelize = require('../models/shared/sequelize');

sequelize.import('../models/record');
sequelize.import('../models/user');
sequelize.import('../models/tag');

sequelize.sync({force: true}).catch((err) => console.error(err)).finally(() => sequelize.close());
