export type Tab = "orders" | "products" | "customers";

export type Order = {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string | null;
    address: string;
    orderTime: Date;
    items: any;
    totalCost: number;
    paymentType: string;
    trxId: string | null;
    paymentStatus: string;
};

export type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    sizeMl: number;
    concentration: string;
    gender: string;
    imageUrls: string[];
    topNotes: string[];
    createdAt: Date;
    updatedAt: Date;
};

export type Customer = {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
    orders: { id: string; orderTime: Date }[];
    _count: {
        orders: number;
    };
};
