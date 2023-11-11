import React from 'react';

const  ThumbnailProduct = (props) =>{
    const {item} = props
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <div className="card">
          <img src={item.thumbnail} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThumbnailProduct;
