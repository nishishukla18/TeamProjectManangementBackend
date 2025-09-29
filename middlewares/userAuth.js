import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; // ✅ safer place to store user info
    } else {
      return res.json({ success: false, message: "Not Authorized." });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
