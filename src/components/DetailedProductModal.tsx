import { Nullable, Product } from "../routes/AboutShop.";

type Props = {
	isOpen: boolean,
	toggleModalOpen: () => void
	product: Nullable<Product>
}

function DetailedProductModal(props: Props) {

	const {
		isOpen,
		toggleModalOpen,
		product,
	} = props;

	return (
		<>
			{
				(isOpen && product !== null && product !== undefined)
					&&
					<div className="modal" onClick={ toggleModalOpen }>
						<div
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
					</div>
			}
		</>
	);
}

export default DetailedProductModal;