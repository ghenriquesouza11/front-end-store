import React from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { addProduct } from '../services/localStorage';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  async componentDidMount() {
    const id = window.location.pathname.split('/').pop();
    const response = await getProductById(id);
    this.setState({
      product: response,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{product.title}</h1>
        <img
          data-testid="product-detail-image"
          src={ `${product.thumbnail}` }
          alt="product-img"
        />
        <p data-testid="product-detail-price">
          {`R$: ${product.price}`}
        </p>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => {
            addProduct(product);
          } }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
      </div>
    );
  }
}

export default Product;
