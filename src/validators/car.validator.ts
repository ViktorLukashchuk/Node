import joi from "joi";

import { EProducer } from "../enums/producer.enum";

export class CarValidator {
  static model = joi.string().min(2).max(30).trim();
  static year = joi.number().min(1990).max(2023);
  static producer = joi.valid(...Object.values(EProducer)).required();

  static create = joi.object({
    model: this.model.required(),
    year: this.year.required(),
    producer: this.producer.required(),
  });

  static update = joi.object({
    model: this.model,
    year: this.year,
  });
}
