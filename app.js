import express from "express";
import foldersRouter from "#api/folders"
import filesRouter from "#api/files"
const app = express();

//this parses the json for express to use
app.use(express.json());

//THis is the routes
app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

//this is the error handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status ?? 500).send(err.message ?? "Internal server error.")
});

export default app;
