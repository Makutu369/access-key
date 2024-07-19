import { AccessKey } from "../../model/access_key.js";
import schemaId from "../../utils/validate_id.js";

const revokeKeyController = async (req, res) => {
  try {
    const { id } = req.params;

    // validate bson id to prevent unnecessary errors
    const result = schemaId.safeParse({ id });
    if (!result.success) return res.status(400).json({ message: "invalid id" });

    const key = await AccessKey.findById(id);

    if (!key) {
      return res.status(404).json({ message: "key not found" });
    }

    key.status = "revoked";

    await key.save();
    res.status(200).json({ message: "key revoked successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal server error", msg: error.message });
  }
};

export { revokeKeyController };
