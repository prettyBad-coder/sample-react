import { Nullable, Product } from "../routes/Products";
import { ReactComponent as CancelIcon } from "../assets/icons/cancel-icon.svg";

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
						<div className="modal__content">
							<div className="modal__cancel">
								<CancelIcon className="modal__cancel-icon"/>
							</div>
                            <div className="modal__header">
                                <div>
									{ product.category }
                                </div>
                                <div>
									{ `${ product.rating.rate }/5 (${ product.rating.count })` }
                                </div>
                            </div>
                            <div className="modal__body">
                                <div className="modal__image-wrapper">
                                    <img className="modal__image" src={ product.image } alt="single-product-image"/>
                                </div>
                                <div className="modal__text-content">
                                    <div className="modal__title">
										{ product.title }
                                    </div>

                                    <div className="modal__description">
										<span>Opis:</span>
										{ product.description }
                                    </div>
                                </div>
                            </div>
							<div className="modal__footer">
								{ `Cena: ${ product.price } zł` }
							</div>
						</div>
					</div>
			}
		</>
	);
}

export default DetailedProductModal;