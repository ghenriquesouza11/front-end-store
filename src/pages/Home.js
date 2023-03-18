import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { addProduct } from '../services/localStorage';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchInput: '',
      searchResult: [],
      searchClicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.createLocalStorageCart = this.createLocalStorageCart.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { searchInput } = this.state;
    const response = await getProductsFromCategoryAndQuery('', searchInput);
    this.setState({
      searchResult: response.results,
      searchClicked: true,
    });
  }

  // createLocalStorageCart() {
  // }

  render() {
    const { categories, searchResult, searchClicked } = this.state;
    return (
      <div>
        {searchClicked === false
          ? (
            <>
              {
                categories.map((categorie) => (
                  <button
                    data-testid="category"
                    key={ categorie.name }
                    onClick={ async () => {
                      const response = await
                      getProductsFromCategoryAndQuery(categorie.id, '');
                      this.setState({
                        searchResult: response.results,
                        searchClicked: true,
                      });
                    } }
                  >
                    {categorie.name}
                  </button>
                ))
              }
              <label>
                <input
                  type="text"
                  data-testid="query-input"
                  name="searchInput"
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="query-button"
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </label>
              <Link
                to="/cart"
                data-testid="shopping-cart-button"
              >
                Carrinho de Compras
              </Link>
              <p
                data-testid="home-initial-message "
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </>
          )
          : (
            <>
              {
                categories.map((categorie) => (
                  <button
                    data-testid="category"
                    key={ categorie.name }
                    onClick={ async () => {
                      const response = await
                      getProductsFromCategoryAndQuery(categorie.id, '');
                      this.setState({
                        searchResult: response.results,
                        searchClicked: true,
                      });
                    } }
                  >
                    {categorie.name}
                  </button>
                ))
              }
              <label>
                <input
                  type="text"
                  data-testid="query-input"
                  name="searchInput"
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="query-button"
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </label>
              <Link
                to="/cart"
                data-testid="shopping-cart-button"
              >
                Carrinho de Compras
              </Link>
              {
                searchResult.length > 0 ? (
                  <ul>
                    {
                      searchResult.map((result) => (
                        <li
                          key={ result.id }
                          data-testid="product"
                        >
                          <Link
                            data-testid="product-detail-link"
                            to={ `/product/${result.id}` }
                          >
                            <h2>{result.title}</h2>
                            <img src={ `${result.thumbnail}` } alt="product-img" />
                            <p>
                              R$:
                              {` ${result.price}`}
                            </p>
                          </Link>
                          <button
                            data-testid="product-add-to-cart"
                            onClick={ () => {
                              addProduct(result);
                            } }
                          >
                            Adicionar ao Carrinho
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                ) : <p>Nenhum produto foi encontrado</p>
              }
            </>
          )}
      </div>
    );
  }
}

export default Home;
