import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductList.css';
import {
  Link,
} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import StarRatings from '../StarRatings/StarRatings';
import { getProducts } from '../../store/actions/productActions';
import { getCategories } from '../../store/actions/categoryActions';

const ProductList = () => {
  const products = useSelector((state) => state.productReducer);
  const categories = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: '',
    averageRating: '',
    category: '',
    sort: '',
    page: 1,
  });

  const [sortObj] = useState({
    'Price Descending': '-baseCost',
    'Price Ascending': 'baseCost',
    'Ratings Descending': '-averageRating',
    'Ratings Ascending': 'averageRating',
  });

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getProducts(filter));
  }, [filter]);

  return (
    <>
      <div className="productlist-wrapper">

        <div className="ui grid container search-container">
          <div className="column">
            <div className="ui action icon input fluid">
              <input placeholder="Search..." type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <div className="ui primary button" onClick={() => setFilter({ ...filter, name: searchText })} onKeyDown={() => setFilter({ ...filter, name: searchText })} role="button" tabIndex="0">
                <i className="search icon" />
              </div>
            </div>
          </div>
        </div>
        <hr />


        <div className="ui grid no-margin">

          {/* Filter Screen - Category logic to be changed */}
          <div className="three wide column filters-col">

            <div className="category-filter filter">
              <div className="ui header">
                Category:
              </div>
              <div className="ui list">
                <div className="onHover" onClick={() => setFilter({ ...filter, category: '', page: 1 })} onKeyDown={() => setFilter({ ...filter, category: '', page: 1 })} role="button" tabIndex="0">
                  <span>{filter.category === '' ? '' : '< Clear'}</span>
                </div>
                {
                  categories.categories.map((category) => (
                    <div className="item pointer onHover" key={category._id} onClick={() => setFilter({ ...filter, category: category._id, page: 1 })} onKeyDown={() => setFilter({ ...filter, category: category._id, page: 1 })} role="button" tabIndex="0">
                      {category.name}
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="ratings-filter filter">
              <div className="ui header">
                Avg. Customer Review
              </div>
              <div className="ui list">
                <div className="onHover" onClick={() => setFilter({ ...filter, averageRating: '', page: 1 })} onKeyDown={() => setFilter({ ...filter, averageRating: '', page: 1 })} role="button" tabIndex="0">
                  <span>{filter.averageRating === '' ? '' : '< Clear'}</span>
                </div>
                {
                  [...Array(4)].map((e, i) => (
                    <div className="item pointer onHover" key={i + 1} onClick={() => setFilter({ ...filter, averageRating: 4 - i, page: 1 })} onKeyDown={() => setFilter({ ...filter, averageRating: 4 - i, page: 1 })} role="button" tabIndex="0">
                      <StarRatings max="5" rating={4 - i} customizable="false" />
                      {' '}
                      & above
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="category-filter filter">
              <div className="ui header">
                Sort By:
              </div>
              <div className="ui list">
                <div className="onHover" onClick={() => setFilter({ ...filter, sort: '', page: 1 })} onKeyDown={() => setFilter({ ...filter, sort: '', page: 1 })} role="button" tabIndex="0">
                  <span>{filter.sort === '' ? '' : '< Clear'}</span>
                </div>
                {
                  Object.keys(sortObj).map((sort) => (
                    <div className="item pointer onHover" key={sort} onClick={() => setFilter({ ...filter, sort: sortObj[sort], page: 1 })} onKeyDown={() => setFilter({ ...filter, sort: sortObj[sort], page: 1 })} role="button" tabIndex="0">
                      {sort}
                    </div>
                  ))
                }
              </div>
            </div>


          </div>

          {/* Main Tab */}
          <div className="thirteen wide column product-col">


            {/* product starts here */}
            {
              products.products.length
                ? products.products.map((currProduct) => (
                  <React.Fragment key={currProduct.name}>
                    <div className="ui relaxed divided items">
                      <div className="item">
                        <Link to={{ pathname: `/product/${currProduct._id}`, state: { product: currProduct } }}>
                          <div className="ui small image pointer">
                            <img src={currProduct.images[0] || 'https://www.moodfit.com/front/images/genral_image_notfound.png'} alt={currProduct.name} />
                          </div>
                        </Link>
                        <div className="content product-details">
                          <Link to={{ pathname: `/product/${currProduct._id}`, state: { product: currProduct } }}>
                            <div className="ui header onHover">{currProduct.name}</div>
                          </Link>

                          <div className="meta">
                            <div className="ui large star rating" data-max-rating="5" data-rating="2">
                              <StarRatings max="5" rating={(currProduct.averageRating) || 0} customizable="false" />
                            </div>
                          </div>


                          <div className="header">
                            $
                            {' '}
                            {currProduct.baseCost}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                )) : <center><h2 className="ui header">No Products Found!</h2></center>
            }
            {/* Ends here */}

            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              breakClassName="break-me"
              pageCount={products.total / products.limit}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(data) => setFilter({ ...filter, page: data.selected + 1 })}
              containerClassName="ui secondary menu flex-center"
              pageClassName="item"
              pageLinkClassName="item-link"
              activeClassName="active"
              previousClassName="item"
              nextClassName="item"
              previousLinkName="item-link"
              nextLinkName="item-link"
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
