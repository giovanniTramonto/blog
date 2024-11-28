export const postSchema = {
  author(value) {
    const { length } = value ?? {};
    return length > 0 && length < 250;
  },
  title(value) {
    const { length } = value ?? {};
    return length > 0 && length < 250;
  },
  description(value) {
    const { length } = value ?? {};
    return length > 0 && length < 500;
  },
};
