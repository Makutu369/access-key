import { z } from "zod";
import { ObjectId } from "mongodb";

const zodObjectId = z.string().refine(
  (val) => {
    try {
      new ObjectId(val);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: "Invalid MongoDB ObjectId",
  }
);

const schemaId = z.object({
  id: zodObjectId,
});

export default schemaId;
