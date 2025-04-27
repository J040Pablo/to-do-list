import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Função para gerar token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Registrar usuário
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Dados inválidos" });
  }
};

// Login usuário
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};

// Pegar perfil do usuário logado
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
};
