import React, { useState, useEffect } from 'react';
import "./ProductList.css"
import StarRatings from '../StarRatings/StarRatings';
import { getProducts } from '../../store/actions/productActions';
import { getCategories } from '../../store/actions/categoryActions';
import { connect } from 'react-redux';
import {
  Link
} from "react-router-dom";

let ProductList = (props) => {
  const [filter, setFilter] = useState({
    name: "",
    rating: "",
    category: "",
    sort: ""
  });

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    props.getCategories();
  }, []);

  useEffect(() => {
    props.getProducts(filter);
  }, [filter]);

  return (
    <React.Fragment>
      <div className="productlist-wrapper">

        <div className="ui grid container search-container">
          <div className="column">
            <div class="ui action icon input fluid">
              <input placeholder="Search..." type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
              <div class="ui primary button" onClick={e => setFilter({ ...filter, name: searchText })}>
                <i class="search icon"></i>
              </div>
            </div>
          </div>
        </div>
        <hr />


        <div className="ui grid no-margin">

          {/* Filter Screen - Category logic to be changed*/}
          <div className="three wide column filters-col">




            <div className="category-filter filter">
              <div className="ui header">
                Category:
              </div>
              <div className="ui list">
                {
                  props.categories.categories.map((category, i) =>
                    <div className="item pointer onHover" key={i} onClick={e => setFilter({ ...filter, category: category.name })}>
                      {category.name}
                    </div>
                  )
                }
              </div>
            </div>
            <div className="ratings-filter filter">
              <div className="ui header">
                Avg. Customer Review
              </div>
              <div className="ui list">
                {
                  [...Array(4)].map((e, i) =>
                    <div className="item pointer onHover" key={i} onClick={e => setFilter({ ...filter, rating: 4 - i })}>
                      <StarRatings max="5" rating={4 - i} customizable="false" /> & above
                    </div>
                  )
                }
              </div>
            </div>
          </div>

          {/* Main Tab */}
          <div className="thirteen wide column product-col">


            {/* product starts here */}
            {
              props.products.products.map((currProduct, i) => {
                return <React.Fragment key={i}>
                  <div className="ui relaxed divided items">
                    <div className="item">
                      <Link to={{ pathname: '/product', state: { product: currProduct } }} >
                        <div className="ui small image pointer">
                          <img src={currProduct.images[0]} />
                        </div>
                      </Link>
                      <div className="content product-details">
                        <Link to={{ pathname: '/product', state: { product: currProduct } }} >
                          <div className="ui header onHover">{currProduct.name}</div>
                        </Link>

                        <div className="meta">
                          <div className="ui large star rating" data-max-rating="5" data-rating="2">
                            {
                              <StarRatings max="5" rating={currProduct.reviews[0].stars} customizable="false" />
                            }
                          </div>
                        </div>


                        <div className="header">
                          $ {currProduct.baseCost}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>

              })
            }
            {/* Ends here */}


          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  return {
    products: state.productReducer,
    categories: state.categoryReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: data => dispatch(getProducts(data)),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);