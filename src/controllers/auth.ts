import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from "../services/auth";
import { getToday } from "../utils/getToday";

export const login: RequestHandler = (req, res) => {
  const loginSchema = z.object({
    password: z.string(),
  });
  const body = loginSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  // Validar a senha $ gerar o token
  if (!auth.validatePassword(body.data.password)) {
    return res.status(403).json({ error: "Senha incorreta" });
  }

  // Retorno da requisação
  res.json({ token: auth.createToken() });
};

export const validade: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!auth.validateToken(token)) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  next();
};
