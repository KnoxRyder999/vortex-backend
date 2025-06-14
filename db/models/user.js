const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    contact: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    }
  }, {
    timestamps: true, // ✅ This is the default
    tableName: 'users',
    hooks: {
      beforeCreate: user => {
        console.log('🔥 beforeCreate hook triggered');
        const salt = crypto.randomBytes(16).toString('hex');
        user.salt = salt;
        user.password = hashPassword(user.password, salt);
      },
      afterFind: (result, options) => {
        if (!result) return;
        if (result.dataValues) {
          delete result.dataValues.password;
          delete result.dataValues.salt;
          result.dataValues.contact = JSON.parse(result.dataValues.contact)
        }
        if (Array.isArray(result)) {
          result.forEach(user => {
            if (user.dataValues) {
              user.dataValues.contact = JSON.parse(user.dataValues.contact)
              delete user.dataValues.password;
              delete user.dataValues.salt;
            }
          });
        }
      },
      beforeUpdate: user => {
        if (user.changed('password')) {
          const salt = crypto.randomBytes(16).toString('hex');
          user.salt = salt;
          user.password = hashPassword(user.password, salt);
        }
      }
    },
  });

  function hashPassword(password, salt) {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
  }

  User.prototype.validatePassword = function (inputPassword) {
    const hashed = hashPassword(inputPassword, this._previousDataValues['salt']);
    return this._previousDataValues.password === hashed;
  };

  return User;
};
