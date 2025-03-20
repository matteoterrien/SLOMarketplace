import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ItemProvider } from "../ItemProvider";
import {
  imageMiddlewareFactory,
  handleImageFileErrors,
} from "../imageUploadMiddleware";
import { verifyAuthToken } from "./auth";

export function registerItemsRoutes(
  app: express.Application,
  mongoClient: MongoClient
) {
  app.get("/api/items", async (req: Request, res: Response) => {
    let userId: string | undefined = undefined;
    if (typeof req.query.createdBy === "string") {
      userId = req.query.createdBy;
    }

    try {
      const itemProvider = new ItemProvider(mongoClient);
      const images = await itemProvider.getAllItems(userId);

      res.json(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  });

  app.patch("/api/items/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const info = req.body;

    if (!info) {
      res.status(400).send({
        error: "Bad request",
        message: "Missing req.body property",
      });

      return;
    }

    const itemProvider = new ItemProvider(mongoClient);
    const item = await itemProvider.updateItem(id, info);

    if (item === 0) {
      res.status(404).send({
        error: "Not found",
        message: "Item does not exist",
      });

      return;
    }

    res.sendStatus(204);
  });

  app.post(
    "/api/items",
    verifyAuthToken,
    imageMiddlewareFactory.single("image"),
    handleImageFileErrors,
    async (req: Request, res: Response): Promise<void> => {
      try {
        if (!req.body) {
          res.status(400).json({
            error: "Bad Request",
            message: "Missing fields",
          });
          return;
        }

        const username = res.locals.token?.username;
        if (!username) {
          res.status(403).json({
            error: "Forbidden",
            message: "Missing user authentication",
          });
          return;
        }

        const itemProvider = new ItemProvider(mongoClient);

        const newItem = {
          _id: req.body._id,
          image: req.file ? `/labs-server/images/${req.file.filename}` : null,
          title: req.body.title,
          price: req.body.price,
          details: req.body.details,
          categories: req.body.categories,
          author: username,
        };

        await itemProvider.createItem(newItem);
        res.status(201).json(newItem);
        return;
      } catch (error) {
        console.error("Error handling item upload:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
    }
  );
}
