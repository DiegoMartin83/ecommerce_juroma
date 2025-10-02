import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.ts";
import { authMiddleware } from "../middlewares/auth.ts";

const router = Router();

// Rutas básicas de usuarios
router.post("/register", registerUser);
router.post("/login", loginUser);


// ruta protegida de ejemplo
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Accediste al perfil protegido 🚀",
    user: (req as any).user,
  });
});


export default router;
