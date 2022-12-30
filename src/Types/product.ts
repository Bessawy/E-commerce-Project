
export interface CategoryType{
    id: number,
    name: string,
    image: string
}

export interface ProductType{
    id: number,
    title: string,
    price: number,
    description: string,
    category: CategoryType,
    images: string[]
}

export interface addProductType{
    title: string,
    price: number,
    description: string,
    categoryId: number,
    images: string[]
}

export interface modifyProductType{
    index: number,
    update: ProductType
}

export interface CartType extends ProductType{
    count: number
}

export type ProductListType = "All"| "Clothes" | "Electronics" | "Furniture" | "Shoes" |"Others";
export type SortType = "None"| "Lowest" | "Highest";