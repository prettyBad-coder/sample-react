import { useEffect, useState } from "react";
import axios from "axios";
import DetailedProductModal from "../components/DetailedProductModal";

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


function AboutShop() {

	const [ products, setProducts ] = useState<Product[]>([]);

	const [ isModalOpen, toggleModalOpen ] = useState<ModalValue<number>>({ value: null, isOpen: false });

	const url = "https://fakestoreapi.com/products";

	useEffect(() => {
		axios.get(url)
			.then(res => {
				console.log(res.data);
				setProducts(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}, []);

	return (
		<>
			<DetailedProductModal
				isOpen={ isModalOpen.isOpen }
				toggleModalOpen={ () => toggleModalOpen({ isOpen: false, value: null }) }
				product={ products.find(product => product.id === isModalOpen.value) }
			/>
			<div className="products-list">
				{
					products.map(product =>
						<div
							onClick={ () => toggleModalOpen({ isOpen: true, value: product.id }) }
							className="products-list__item"
							key={ product.id }
						>
							<div className="product-list__item-title">{ product.title }</div>
							<div className="products-list__item-image-wrapper">
								<img src={ product.image } className="products-list__item-image" alt="product-image"/>
							</div>
							<div className="products-list__item-bottom">
								<div className="products-list__item-price">{ `${ product.price } zł` }</div>
								<button className="products-list__item-add-button">Dodaj +</button>
							</div>
						</div>
					)
				}
			</div>
		</>
	)
}

export default AboutShop;