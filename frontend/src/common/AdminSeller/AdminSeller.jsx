import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AdminSeller.css';
import { getSellers } from '../../store/actions/userActions';
import { Link } from 'react-router-dom';

const AdminSeller = () => {
  const users = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellers());
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="adminseller-wrapper container ui">
        <center>
          <h1 className="ui dividing header">
            Seller List
          </h1>

          <div className="search-container mt-3">
            <div className="ui action icon input fluid">
              <i className="search icon" />
              <input placeholder="Search..." type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
          </div>

        </center>

        <div className="user-container mt-5">
          {
            users.sellers.filter((seller) => seller.name.toLowerCase().includes(searchText.toLowerCase())).map((seller) => (
              <div className="user mt-3" key={seller.id}>
                <div className="left flex-center">
                  <img class="ui circular small image" src={seller.profile_image || 'http://www.lorrayndepeyer.com/wp-content/uploads/2016/09/profile_silhouette-1-272x300.png'} />
                  <Link to={'/profile/' + seller.email}>
                    <span>{seller.name}</span>
                  </Link>
                </div>

                <div className="right">
                  <Link to={{ pathname: '/monthlyStats', state: { seller } }}>
                    <div className="ui button primary">View Monthly Sales</div>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default AdminSeller;
