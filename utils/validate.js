import { z } from "zod";

const schema = z.object({
  email: z.string("not a string").email("not an email"),
  password: z.string().min(8, ""),
});

const validate = (email, password) => {
  try {
    schema.parse({ email, password });
  } catch (error) {
    return error;
  }
};

export { validate };
