import * as yup from 'yup';

const editSchema = yup.object().shape({
  title: yup.string().trim().max(255, 'is too long.').required('is required.'),
  description: yup.string().trim().max(2000, 'is too long.'),
  signatories: yup.array().of(
    yup.object().shape({
      id: yup.string(),
    }),
  ),
});

const createSchema = editSchema
  .shape({
    size: yup
      .number()
      .lessThan(30_000_000, 'is too large.')
      .nullable()
      .required(),
    type: yup
      .string()
      .oneOf(['application/pdf'], 'is not an approved type.')
      .nullable()
      .required(),
  })
  .required();

export { createSchema, editSchema };
