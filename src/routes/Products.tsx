import { useEffect, useState } from "react";
import axios from "axios";
import DetailedProductModal from "../components/DetailedProductModal";
import SingleProduct, { BasketAction } from "../components/SingleProduct";
import { ReactComponent as BasketIcon } from "../assets/icons/basket-icon.svg";

export type Product = {
	id: number
	image: string
	description: string
	category: string
	rating: {
		count: number
		rate: number
	}
	title: string
	price: number
}

export type Nullable<T> = null | T | undefined;


export type ModalValue<T> = {
	value: Nullable<T>
	isOpen: boolean
}

enum SortValue {
	NONE= "NONE",
	ASCENDING = "ASCENDING",
	DESCENDING = "DESCENDING",
}


function Products() {

	const [ fetchedProducts, setFetchedProducts ] = useState<Product[]>([]);

	const [ products, setProducts ] = useState<Product[]>([]);

	const [ basket, setBasket ] = useState({
		price: 0,
		productsCount: 0,
	});

	const [ isModalOpen, toggleModalOpen ] = useState<ModalValue<number>>({ value: null, isOpen: false });

	const url = "https://fakestoreapi.com/products";

	const _fetchData = () => {
		axios.get(url)
			 .then(res => {
				 console.log(res.data);
				 setProducts(res.data);
				 setFetchedProducts([ ...res.data ]);
			 })
			 .catch(err => {
				 console.log(err);
			 })
	};

	useEffect(() => {
		_fetchData();
	}, []);

	const _sortState = (sortValue: SortValue, data: Product[]) =>
		data.sort((a, b) => {
			if (sortValue === SortValue.ASCENDING) {
				return a.title.localeCompare(b.title);
			}
			return b.title.localeCompare(a.title);
		})

	const _onSortChange = (sortValue: SortValue) => {
		switch (sortValue) {
			case SortValue.ASCENDING:
				setProducts(prevState => [ ..._sortState(sortValue, prevState) ]);
				break;
			case SortValue.DESCENDING:
				setProducts(prevState => [ ..._sortState(sortValue, prevState) ]);
				break;
			case SortValue.NONE:
				setProducts([ ...fetchedProducts ]);
				break;
		}
	}

	const _onBasketChange = (basketAction: BasketAction, price: number) => {
		if (basketAction === BasketAction.ADD) {
			setBasket(prevState => ({ price: prevState.price + price, productsCount: prevState.productsCount++ }))
			return;
		}
		setBasket(prevState => ({ price: prevState.price - price, productsCount: prevState.productsCount-- }))
	}

	return (
		<>
			<DetailedProductModal
				isOpen={ isModalOpen.isOpen }
				toggleModalOpen={ () => toggleModalOpen({ isOpen: false, value: null }) }
				product={ products.find(product => product.id === isModalOpen.value) ?? null }
			/>
			<div className="products">
				<div className="products__options">
					<div className="products__basket-wrapper">
						<div className="products__basket-counter">{ basket.productsCount }</div>
						{ `${ Math.round(basket.price * 100) / 100 } zł` }
						<BasketIcon/>
					</div>
					<div className="products__select-wrapper">
						<label htmlFor="sort">Sortowanie alfabetyczne</label>
						<select name="sort" id="sort" onChange={ e => _onSortChange(e.target.value as SortValue) }>
							<option value={ SortValue.NONE }>Brak</option>
							<option value={ SortValue.ASCENDING }>Rosnąco</option>
							<option value={ SortValue.DESCENDING }>Malejąco</option>
						</select>
					</div>
				</div>
				<div className="products__list">
					{
						products.map(product =>
							<SingleProduct
								key={ product.id }
								product={ product }
								toggleModalOpen={ () => toggleModalOpen({ isOpen: true, value: product.id }) }
								onBasketChange={ basketAction => _onBasketChange(basketAction, product.price) }
							/>
						)
					}
				</div>
			</div>
		</>
	)
}

export default Products;