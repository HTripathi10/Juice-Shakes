import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            
          </Link>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <span className="text-warning">© 2023 Juice&Shakes, Inc</span>
        </div>
        <div className="col-md-4">
          <ul className="nav justify-content-end list-unstyled d-flex">
          </ul>
        </div>
      </footer>
    </div>
  );
}

