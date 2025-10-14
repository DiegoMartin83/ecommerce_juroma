import { Router } from "express";
import {
 getUsers,
 getUserById,
 getUserByEmail
} from "../controllers/users.controller.js";



const router = Router();

router.get("/", getUsers);
router.get ("/:id", getUserById);
router.get("/email/:email", getUserByEmail);

// router.put("/:id", updateProfile)


// // ruta protegida de ejemplo
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({
//     message: "Accediste al perfil protegido 🚀",
//     user: (req as any).user,
//   });
// });


export default router;
