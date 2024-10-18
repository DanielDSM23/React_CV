import React, { useState } from 'react'
import PropTypes from 'prop-types';



function Search() {
  const [name, setName] = useState()
  return (
    <div style={{marginTop: 100}} className={"d-flex justify-content-evenly align-items-center w-100"}>
        <div className="row justify-content-start">

          <div className="card ">
            <div className="card-body">
              <form className="d-flex" >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Rechercher"
                  aria-label="Rechercher"
                  value={name}

                />
              </form>
          </div>
        </div>
      </div>
    </div>
  )
    ;
}

export default Search;
