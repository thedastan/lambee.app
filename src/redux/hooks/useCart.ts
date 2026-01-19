import { useState, useEffect } from "react";

export interface CartItem {
  id: number;
  variantId: number;
  variantTitle: string;
  type: "one-time" | "subscription";
  price: number;
  quantity: number;
  itemsCount: number;
  subscriptionPrice?: number;
  discountPercent?: number;
  productId: number;
  productTitle: string;
  imageUrl: string;
  availableVariants: {
    id: number;
    title: string;
    weight_range: string;
    items_count: number;
    minCountSubscription?: number;
    min_count_subscription?: number;
  }[];
}

let cartState: CartItem[] = [];
const listeners: Array<(cart: CartItem[]) => void> = [];

if (typeof window !== "undefined") {
  const raw = localStorage.getItem("cart");
  if (raw) {
    try {
      cartState = JSON.parse(raw);
    } catch (e) {
      cartState = [];
    }
  }
}

const setCart = (newCart: CartItem[]) => {
  cartState = newCart;
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  listeners.forEach((listener) => listener([...newCart]));
};

const getCart = () => [...cartState];

const subscribe = (listener: (cart: CartItem[]) => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
};

export const useCart = () => {
  const [cart, setLocalCart] = useState<CartItem[]>(getCart());

  useEffect(() => {
    const unsubscribe = subscribe(setLocalCart);
    return unsubscribe;
  }, []);

  const addItem = (item: Omit<CartItem, "id">) => {
    const existing = cart.find(
      (i) =>
        i.productId === item.productId &&
        i.variantId === item.variantId &&
        i.type === item.type
    );
    if (existing) throw new Error("Товар уже добавлен в корзину");
    const newItem: CartItem = { ...item, id: Date.now() };
    setCart([...cart, newItem]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) =>
    setCart(cart.filter((item) => item.id !== id));

  const changeItemVariant = (itemId: number, newVariantId: number) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item || !item.availableVariants) return;

    const newVariant = item.availableVariants.find((v) => v.id === newVariantId);
    if (!newVariant) return;

    // 1. Определяем минималку для нового варианта
    const newMinQty =
      item.type === "subscription"
        ? newVariant.min_count_subscription ??
          (newVariant as any).minCountSubscription ??
          1
        : 1;

    // 2. Определяем переносимое количество (не меньше новой минималки)
    const quantityToTransfer =
      item.quantity < newMinQty ? newMinQty : item.quantity;

    // 3. Ищем, есть ли уже в корзине товар с таким variantId и типом
    const existingItem = cart.find(
      (i) =>
        i.productId === item.productId &&
        i.variantId === newVariantId &&
        i.type === item.type &&
        i.id !== itemId
    );

    if (existingItem) {
      // ✅ Объединяем: прибавляем количество изменяемого товара к существующему
      const updated = cart
        .map((i) =>
          i.id === existingItem.id
            ? { ...i, quantity: i.quantity + quantityToTransfer }
            : i
        )
        .filter((i) => i.id !== itemId);
      setCart(updated);
    } else {
      // ✅ Просто обновляем текущий товар
      const updated = cart.map((i) =>
        i.id === itemId
          ? {
              ...i,
              variantId: newVariantId,
              variantTitle: newVariant.title,
              itemsCount: newVariant.items_count,
              quantity: quantityToTransfer,
            }
          : i
      );
      setCart(updated);
    }
  };

  return {
    cart,
    addItem,
    updateQuantity,
    removeItem,
    changeItemVariant,
    getOneTimeItemsCount: () =>
      cart
        .filter((i) => i.type === "one-time")
        .reduce((s, i) => s + i.quantity, 0),
    clear: () => setCart([]),
  };
};