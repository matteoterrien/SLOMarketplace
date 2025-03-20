import { MongoClient } from "mongodb";

interface ItemSchema {
  _id: string;
  image: string | null;
  price: string;
  title: string;
  details: string;
  categories: string[];
  author: string | AuthorSchema | null;
}

interface AuthorSchema {
  _id: string;
  username: string;
  email: string;
}

export class ItemProvider {
  constructor(private readonly mongoClient: MongoClient) {}

  async getAllItems(authorId?: string): Promise<ItemSchema[]> {
    const collectionName = process.env.ITEMS_COLLECTION_NAME;

    if (!collectionName) {
      throw new Error(
        "Missing ITEMS_COLLECTION_NAME from environment variables"
      );
    }

    const collection = this.mongoClient
      .db()
      .collection<ItemSchema>(collectionName);

    const filter = authorId ? { author: authorId } : {};
    const items = await collection.find(filter).toArray();

    return items.map((item) => ({
      _id: item._id.toString(),
      image: item.image,
      price: item.price,
      title: item.title,
      details: item.details,
      categories: item.categories || ["All"],
      author: item.author,
    }));
  }

  async updateItem(
    itemId: string,
    updates: Partial<ItemSchema>
  ): Promise<number> {
    const collectionName = process.env.ITEMS_COLLECTION_NAME;

    if (!collectionName) {
      throw new Error("Missing ITEMS_COLLECTION_NAME from env file");
    }

    const collection = this.mongoClient
      .db()
      .collection<ItemSchema>(collectionName);

    const result = await collection.updateOne(
      { _id: itemId },
      { $set: updates }
    );

    return result.matchedCount;
  }

  async createItem(item: ItemSchema): Promise<number> {
    const collectionName = process.env.ITEMS_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error("Missing ITEMS_COLLECTION_NAME from env file");
    }

    const collection = this.mongoClient
      .db()
      .collection<ItemSchema>(collectionName);

    await collection.insertOne(item);

    return 1;
  }
}
