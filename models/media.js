```js
// backend/models/media.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Director from "./director.js";
import Producer from "./producer.js";
import Genre from "./genre.js";
import Type from "./type.js";

const Media = sequelize.define("Media", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
  },
  directorId: {
    type: DataTypes.INTEGER,
    allowNull: true, // ✅ ahora puede ser NULL
    references: {
      model: Director,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  producerId: {
    type: DataTypes.INTEGER,
    allowNull: true, // ✅ puede ser NULL
    references: {
      model: Producer,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: true, // ✅ puede ser NULL
    references: {
      model: Genre,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: true, // ✅ puede ser NULL
    references: {
      model: Type,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
});

export default Media;
```

