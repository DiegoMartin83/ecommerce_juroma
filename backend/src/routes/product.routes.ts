// import { Router } from "express";
// import { getProducts, createProduct } from "../controllers/product.controller.ts";


// const router = Router();

// router.get("/", getProducts);
// router.post("/", createProduct);

// export default router;
import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.ts";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
