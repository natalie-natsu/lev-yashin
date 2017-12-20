import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
import './Description.css';
import background from './assets/home-description-background.jpg';

export default () => (
    <section id="home-description">
        <div className="parallax" style={{ backgroundImage: `url("${background}")` }} />
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="pictured">
                        <div className="picture text-neutral">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <h2 className="title">
                            Qui aura la fameuse étoile<br />
                            <small>entre toi et tes amis ?</small>
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Integer non enim justo. Proin bibendum mattis elit non consectetur.
                            Praesent faucibus sed leo sit amet posuere. Nunc interdum orci ut consequat pretium.
                            Ut eu mattis sem, nec eleifend tellus.
                            Nullam venenatis tempus tortor, nec hendrerit felis tristique ut.
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card hidden-sm-down">
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
