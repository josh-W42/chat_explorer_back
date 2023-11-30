import { ModelStatic } from "sequelize";
import { CreateMessageModel } from "./message";

export const enum ModelNames {
  Message = "Message",
}

type ModelCreationInterface = {
  [key in ModelNames]: () => [ModelNames, ModelStatic<any>];
};

export const ModelCreationFunctions: ModelCreationInterface = {
  Message: CreateMessageModel,
};
