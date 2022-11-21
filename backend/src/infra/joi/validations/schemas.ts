import joi from 'joi';

export const userCredentialsSchema = joi.object({
  username: joi.string().min(3).required(),
  password: joi
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .required()
});

export const createTransactionSchema = joi.object({
  amount: joi.number().min(1).required(),
  debitedAccount: joi.string().required(),
  creditedAccount: joi.string().required()
});
