import React from 'react';
import './NoMatch.css';

const NoMatch = props => (
    <div id="no-match">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-6 mx-auto">
                    <div className="card border-warning animated bounce">
                        <div className="card-body">
                            <h4 className="card-title text-warning">404 <small>Oops! Page not found.</small></h4>
                            <p className="card-text text-warning">
                                We couldn't fin the page you were searching for.
                            </p>
                            <a href="/" className="btn btn-outline-warning float-right btn-block btn-previous-down">
                                <i className="fa fa-home"/> Go home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default NoMatch;
