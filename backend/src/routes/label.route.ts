import express, { Router } from "express";
import { create_label, delete_label, get_label_by_id, get_labels_by_user_id, update_label, upload_logo } from "../controllers/label.controller";
import { validateData } from "../middleware/validation.middleware";
import { labelCreationSchema } from "../schemas/label.schema";
import { authenticateToken } from "../middleware/jwt.middleware";
import multer from "multer";

export default ()=>{

    const router: Router = express.Router();
    const upload = multer(); // Use memory storage for Firebase uploads

    router.post('/', validateData(labelCreationSchema), authenticateToken, create_label);
    
    router.get('/get-user-labels', authenticateToken, get_labels_by_user_id)

    router.delete('/:id', authenticateToken, delete_label);

    router.get('/:id', authenticateToken, get_label_by_id);

    router.put('/:id', authenticateToken, update_label);

    router.post('/upload-logo', authenticateToken, upload.single("file"), upload_logo);
    
    return router;
}

