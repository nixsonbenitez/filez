import express from "express";
import db from "#db/client";
const router = express.Router();

router.get("/", async (req, res, next) => {
    
    try {
        const result = await db.query(`SELECT * FROM folders`);
        res.send(result.rows);
    } catch(err) {
        next(err);
    }
})


router.get("/:id", async (req, res, next) => {
    const{id} = req.params;
    try{
        const result = await db.query(
            `
            SELECT folders.*, json_agg(files.*) AS files
            FROM folders 
            LEFT JOIN files ON files.folder_id = folders.id
            WHERE folders.id = $1
            GROUP BY folders.id
            `, [id]);

    const folder = result.rows[0]
    if(!folder){
        res.status(404).send("That does not exist");
    } else {
        res.send(folder);
    }}catch(err){
        next(err);
    }});

    router.post("/:id/files", async (req, res, next ) => {
        const{id} = req.params;
        try{
            const folderResult = await db.query(
                `SELECT * FROM folders WHERE  id = $1`, [id]
            );
        const folder = folderResult.rows[0];
        if(!folder){
            return res.status(404).send("Folder not found");
        }
        if(!req.body){
            return res.status(400).send("Body is required")
        }
        const{name, size} = req.body;
        if(!name||!size){
            return res.status(400).send("Missing required fields");
        }
        const result = await db.query(
            `INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3) RETURNING *`,
            [name, size, id]
        );
        res.status(201).send(result.rows[0])
        }catch(err){
            next(err);
        }
    })

//What is going on reading line by line
//req.params grabs the id from our params
// then we query for that specific flle through our folder.
// since we are sending data we have to have checks that means 
// making sure we have the name and size and querying to make sure what we sned exists
// if no folder we have to communicate that does not exists 
export default router;