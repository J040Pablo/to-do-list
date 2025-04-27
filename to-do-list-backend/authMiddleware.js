import jwt from "jsonwebtoken";
import User from "./src/models/UserModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca o usuário e adiciona no objeto req
      req.user = await User.findById(decoded.id).select("-password");

      return next(); // Chama o próximo middleware
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: "Não autorizado, token inválido" });
    }
  }

  // Caso não tenha um token válido
  return res.status(401).json({ message: "Não autorizado, sem token" });
};
