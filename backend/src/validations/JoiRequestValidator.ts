import Joi from 'joi';
import { RequestValidator } from '../controllers/RequestValidator';

export class JoiRequestValidator implements RequestValidator {
  constructor(private readonly schema: Joi.Schema) {}

  validate = async (data: unknown): Promise<boolean> => {
    const { error } = this.schema.validate(data);

    if (error) return false;

    return true;
  };
}
