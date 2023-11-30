import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic,
} from "sequelize";
import DB from "../../database/db";
import { ModelNames } from "..";

interface Message
  extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  id: CreationOptional<string>;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const CreateMessageModel: () => [
  ModelNames,
  ModelStatic<Message>
] = () => {
  const model = DB.sq.define<Message>(
    ModelNames.Message,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      content: DataTypes.STRING,
    },
    {
      // Marking messages for soft-deletion
      paranoid: true,
    }
  );

  return [ModelNames.Message, model];
};
