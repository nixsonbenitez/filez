import express from "express";
import db from "#db/client";
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await db.query(`
            SELECT files.*, folders.name AS folder_name
            FROM files
            JOIN folders on folders.id = files.folder_id
            `);
            res.send(result.rows);
    } catch(err){
        next(err);
    }
})




export default router;