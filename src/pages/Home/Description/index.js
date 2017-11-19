import React from 'react';
import './Description.css';

export default () => (
    <section id="home-description">
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <div className="pictured">
                        <div className="picture">
                            <i className="fa fa-star" />
                        </div>
                        <h2 className="title">
                            Qui aura la fameuse étoile<br />
                            <small>entre toi et tes amis ?</small>
                        </h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer non enim justo. Proin bibendum mattis elit non consectetur.
                        Praesent faucibus sed leo sit amet posuere. Nunc interdum orci ut consequat pretium.
                        Ut eu mattis sem, nec eleifend tellus.
                        Nullam venenatis tempus tortor, nec hendrerit felis tristique ut.
                    </p>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Special title treatment</h4>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
