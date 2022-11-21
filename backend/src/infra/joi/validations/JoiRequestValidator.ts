import { RequestValidator } from '../../../presentation/contracts/RequestValidator';

import Joi from 'joi';
export class JoiRequestValidator implements RequestValidator {
  constructor(private readonly schema: Joi.Schema) {}

  validate = async (data: unknown): Promise<boolean> => {
    const { error } = this.schema.validate(data);

    if (error) return false;

    return true;
  };
}
