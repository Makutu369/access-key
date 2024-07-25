import { AccessKey } from "../../model/access_key.js";
import schemaId from "../../utils/validate_id.js";
const revokeKeyController = async (req, res) => {
  try {
    const { key } = req.params;
    // validate bson id to prevent unnecessary errors

    const keyData = await AccessKey.findOne({ key: key });

    if (!keyData) {
      return res.status(404).json({ message: "key not found" });
    }

    if (keyData.status === "revoked")
      return res.status(400).json({ message: "key is already revoked" });

    keyData.status = "revoked";
    await keyData.save();
    res
      .status(200)
      .json({
        message: "key revoked successfully",
        data: { key: keyData.key, status: keyData.status },
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal server error", msg: error.message });
  }
};

export { revokeKeyController };
