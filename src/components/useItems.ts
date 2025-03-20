import { useEffect, useState } from "react";

export interface Item {
  _id: string;
  image: string | null;
  price: string;
  title: string;
  details: string;
  categories: string[];
  author: string | null;
}

export function useItems(authToken: string | null) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }

        const data: Item[] = await response.json();
        setItems(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    if (authToken) {
      fetchItems();
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  return { isLoading, items, error };
}
