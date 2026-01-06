import { Router } from "express";
import { tokenSystemController, TokenSystemController } from "./tokenSystem.controller.js";

export class TokenSystemRouter {
    constructor (
        private controller: TokenSystemController = tokenSystemController
    ) {}

    getRouter = () => {
        const router = Router();

        router.get("/templates", (req,res)=>{});
        router.post("/templates", (req,res)=>{});
        router.get("/templates/:templateId", (req,res)=>{});
        router.put("/templates/:templateId", (req,res)=>{});
        router.delete("/templates/:templateId", (req,res)=>{});

        router.post("/templates/:templateId/tokens", (req,res)=>{});
        router.get("/templates/:templateId/tokens", (req,res)=>{});
        router.delete("/templates/:templateId/tokens/:tokenId", (req,res)=>{});

        router.put("/redeem", (req,res)=>{});

        return router;

    }
}

export const tokenSystemRouter = new TokenSystemRouter();