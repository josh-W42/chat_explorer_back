import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic,
} from "sequelize";
import { CreateMessageModel } from "./message";

export const enum ModelNames {
  Message = "Message",
}

export type ModelWrapper<M extends Model<any, any>> = Model<
  InferAttributes<M>,
  InferCreationAttributes<M>
>;

export const ModelCreationFunctions = {
  Message: CreateMessageModel,
};
