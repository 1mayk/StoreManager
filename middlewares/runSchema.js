const runSchema = (schema) => (unknown) => {
  const { error, value } = schema.validate(unknown);
  if (error) throw error;
  return value;
};

module.exports = runSchema;
