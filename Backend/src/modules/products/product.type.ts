import { ProductState } from "src/enums/product-state";
import { ProductStatus } from "src/enums/product-status";
import { ProductType } from "src/enums/product-type";

export type ProductParams = {
    type: ProductType;
    subject: string;
    description: string;
    status: ProductStatus;
    state: ProductState;
}