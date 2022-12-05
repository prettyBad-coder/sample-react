import { Product } from "../routes/Products";
import { MouseEvent, useState } from "react";

export enum BasketAction {
	ADD = "ADD",
	DELETE = "DELETE",
}

type Props = {
	product: Product
	toggleModalOpen: () => void
	onBasketChange: (basketAction: BasketAction, price: number) => void
}

function SingleProduct(props: Props) {

	const {
		product,
		toggleModalOpen,
		onBasketChange,
	} = props;

	const [ isItemChosen, toggleItemChoose ] = useState(false);

	const _onAddClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		toggleItemChoose(isChosen => !isChosen);
		onBasketChange(isItemChosen ? BasketAction.DELETE : BasketAction.ADD, product.price);
	}

	return (
		<div
			onClick={ toggleModalOpen }
			className="products__list-item"
			key={ product.id }
		>
			<div className="products__list-item-title">{ product.title }</div>
			<div className="products__list-item-image-wrapper">
				<img src={ product.image } className="products__list-item-image" alt="product-image"/>
			</div>
			<div className="products__list-item-bottom">
				<div>
					{ `${ product.price } zł` }
				</div>
				<button
					className="products__list-item-add-button"
					style={{ borderColor: isItemChosen ? "#e76f51" : "#2a9d8f" }}
					onClick={ _onAddClick }
				>
					{ isItemChosen ? "Usuń -" : "Dodaj +" }
				</button>
			</div>
		</div>
	);
}

export default SingleProduct;