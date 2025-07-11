import { ProductState } from 'src/enums/product-state';
import { ProductStatus } from 'src/enums/product-status';
import { ProductType } from 'src/enums/product-type';

const ProductTypeEnumMapping = {
    edible: ProductType.EDIBLE,
    non_edible: ProductType.NON_EDIBLE,
};

const ProductStatusEnumMapping = {
    unread: ProductStatus.UNREAD,
    in_process: ProductStatus.IN_PROCESS,
    resolved: ProductStatus.RESOLVED,
};

const ProductStateEnumMapping = {
    new: ProductState.NEW,
    pending: ProductState.PENDING,
    critical: ProductState.CRITICAL
};

export default { 
    ProductTypeEnumMapping, 
    ProductStatusEnumMapping, 
    ProductStateEnumMapping 
};