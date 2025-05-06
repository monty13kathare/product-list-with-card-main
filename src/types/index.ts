export interface Product {
    id: number;
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
    name: string;
    category: string;
    price: number;
}

export interface CartItem extends Product {
    quantity: number;
}
