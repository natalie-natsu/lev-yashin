import React from 'react';
import { Trans, translate } from 'react-i18next';
import './Landing.scss';
import banner from './assets/banner.png';

const Landing = () => (
    <section id="home-landing" className="jumbotron-fluid" style={{ backgroundImage: `url(${banner})` }}>
        <div className="container">
            <h1>
                <span className="f-secondary">
                    <Trans i18nKey="page:Home.Landing.title" parent="span">
                        Win the <span className="hidden-sm-down d-sm-inline">RUSSIA</span> World Cup
                    </Trans>
                </span>
            </h1>
        </div>
    </section>
);
export default translate(['page'])(Landing);
