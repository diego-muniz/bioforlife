export default async (schema, data) => {
  const error = await schema
    .validate(data)
    .then(() => false)
    .catch(err => err);
  if (error) {
    return { error: error.message };
  }
  return false;
};
