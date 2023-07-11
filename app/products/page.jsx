import {getProducts} from "@/lib/prisma/products";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import SortSelect from "./SortSelect";

export const revalidate = 24 * 3600;

const Products = async ({searchParams}) => {
	const {isSpicy, isVegan, category, sort} = searchParams;
	const products = await getProducts({
		categoryName: category,
		sort,
		isSpicy: isSpicy != null ? Boolean(isSpicy) : undefined,
		isVegan: isVegan != null ? Boolean(isVegan) : undefined
	});

	const filterDisplaySettings = {
		isSpicy: products.some(product => product.isSpicy === true),
		isVegan: products.some(product => product.isVegan === true)
	};

	return (
		<>
			<div className="flex items-center mb-4 gap-2 flex-col sm:flex-row">
				<ProductFilters displaySettings={filterDisplaySettings} />
				<div className="ml-0 sm:ml-auto">
					<SortSelect />
				</div>
			</div>
			<ProductList products={products} />
		</>
	);
};

export default Products;
