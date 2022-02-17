const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/workshop"
);

const Todo = sequelize.define("todo", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
  },
});

const Thing = sequelize.define("thing", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validator: {
      notEmpty: true,
    },
  },
});

Thing.belongsTo(Todo);
Todo.hasMany(Thing);

const data = async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    const study = await Todo.create({ name: "study" });
    const housework = await Todo.create({ name: "housework" });
    const homework = await Todo.create({ name: "homework" });
    await Thing.create({ name: "coding", todoId: study.id });
    await Thing.create({ name: "algorithm", todoId: study.id });
    await Thing.create({ name: "dealer choice", todoId: homework.id });
    await Thing.create({ name: "clean the toilet", todoId: housework.id });
    await Thing.create({ name: "feed the cat", todoId: housework.id });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`server listening at PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  sequelize,
  data,
  Thing,
  Todo,
};
