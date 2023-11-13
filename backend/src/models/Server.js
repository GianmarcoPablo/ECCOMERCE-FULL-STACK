import express from "express";
import connectDB from "../db/config.js";
import cors from "cors"
import { UserRoutes, AuthRoutes, CategoryRoutes, ProductsRoutes, SearchRoutes } from "../routes/index.js"

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // paths
        this.adminPath = "/api/users";
        this.authPath = "/api/auth";
        this.categoriesPath = "/api/categories";
        this.productsPath = "/api/products";
        this.searchPath = "/api/search";
        this.uploadsPath = "/api/uploads";
        // db connection
        this.dbConnetion();
        // middlewares
        this.middlewares();
        // routes
        this.routes();
    }

    async dbConnetion() {
        await connectDB();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }
    routes() {
        this.app.use(this.adminPath, UserRoutes);
        this.app.use(this.authPath, AuthRoutes);
        this.app.use(this.categoriesPath, CategoryRoutes);
        this.app.use(this.productsPath, ProductsRoutes);
        this.app.use(this.searchPath, SearchRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;