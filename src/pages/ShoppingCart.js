import React from 'react';
import { Link } from 'react-router-dom';
// import { getProductById } from '../services/api';
import {
  increaseProduct,
  decreaseProduct,
  removeProduct,
} from '../services/localStorage';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const savedProductsKey = 'savedProducts';
    const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
    this.setState({
      products: savedProducts,
    });
  }

  increaseProductClick(productId) {
    increaseProduct(productId);
    const savedProductsKey = 'savedProducts';
    const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
    this.setState({
      products: savedProducts,
    });
  }

  decreaseProductClick(productId) {
    decreaseProduct(productId);
    const savedProductsKey = 'savedProducts';
    const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
    this.setState({
      products: savedProducts,
    });
  }

  removeProductClick(productID) {
    removeProduct(productID);
    const savedProductsKey = 'savedProducts';
    const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
    this.setState({
      products: savedProducts,
    });
  }

  render() {
    const savedProductsKey = 'savedProducts';
    const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
    const { products } = this.state;
    let cartTotal = 0;
    return (
      <div>
        {
          savedProducts.length > 0 ? (
            <>
              <ul>
                <li>
                  <Link
                    to="/"
                  >
                    Página Inicial
                  </Link>

                </li>
                <li>
                  <Link
                    to="/cart"
                    data-testid="shopping-cart-button"
                  >
                    Carrinho de Compras
                  </Link>
                </li>
              </ul>
              {
                products.map((product) => (
                  <div
                    key={ product.product.id }
                  >

                    <h3
                      data-testid="shopping-cart-product-name"
                    >
                      {product.product.title}
                    </h3>
                    <img src={ product.product.thumbnail } alt="product-img" />
                    <p>{`R$: ${product.amount * product.product.price}`}</p>
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      {`Quantidade: ${product.amount}`}
                    </p>
                    <button
                      data-testid="product-decrease-quantity"
                      disabled={ product.amount < 2 }
                      onClick={ () => {
                        this.decreaseProductClick(product.product.id);
                      } }
                    >
                      -

                    </button>
                    <button
                      data-testid="product-increase-quantity"
                      onClick={ () => {
                        this.increaseProductClick(product.product.id);
                      } }
                    >
                      +

                    </button>
                    <button
                      data-testid="remove-product"
                      onClick={ () => {
                        this.removeProductClick(product.product.id);
                      } }
                    >
                      Excluir Produto
                    </button>
                  </div>
                ))
              }
              {
                savedProducts.forEach((element) => {
                  cartTotal += element.amount * element.product.price;
                })
              }
              <p>
                Valor Total da Compra: R$
                {` ${cartTotal}`}
              </p>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link
                    to="/"
                  >
                    Página Inicial
                  </Link>

                </li>
                <li>
                  <Link
                    to="/cart"
                    data-testid="shopping-cart-button"
                  >
                    Carrinho de Compras
                  </Link>
                </li>
              </ul>
              <p
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </p>
            </>
          )
        }
      </div>
    );
  }
}

export default ShoppingCart;
