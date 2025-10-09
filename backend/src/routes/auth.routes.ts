// import { Router } from "express";
// import { registerUser, loginUser } from "../controllers/auth.controller";
// import { authMiddleware } from "../middlewares/auth";

// const router = Router();

// // Registro de usuario
// router.post("/register", registerUser);

// // Login de usuario
// router.post("/login", loginUser);

// // ruta protegida de ejemplo
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({
//     message: "Accediste al perfil protegido 🚀",
//     user: (req as any).user,
//   });
// });

// export default router;
import { Router } from "express";
import { 
  registerUser, 
  loginUser, 
  getProfile, 
  updateProfile 
} from "../controllers/auth.controller.ts";
import { authMiddleware } from "../middlewares/auth.ts";

const router = Router();

// Registro de usuario
router.post("/register", registerUser);

// Login de usuario
router.post("/login", loginUser);

//Perfiles
 router.get("/:id", getProfile);
 router.put("/:id", updateProfile);
 

// ruta protegida de ejemplo
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Accediste al perfil protegido 🚀",
    user: (req as any).user,
  });
});

export default router;
