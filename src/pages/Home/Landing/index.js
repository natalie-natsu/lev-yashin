import React from 'react';
import { Trans, translate } from 'react-i18next';
import './Landing.scss';
import banner from './assets/banner.png';

const Landing = () => (
    <section id="home-landing" className="jumbotron-fluid" style={{ backgroundImage: `url(${banner})` }}>
        <span className="square" style={{ backgroundImage: `url(${banner})` }} />
        <div className="container">
            <h1 className="animated fadeIn">
                <span className="f-secondary">
                    <Trans i18nKey="page:Home.Landing.title" parent="span">
                        Win the <span className="hidden-sm-down d-sm-inline">RUSSIA</span> World Cup
                    </Trans>
                </span><br />
                <small className="h3 font-weight-light">
                    <Trans i18nKey="page:Home.Landing.subtitle" parent="span">
                        <span className="hidden-sm-down d-sm-inline">Casual</span> fantasy football game
                    </Trans>
                </small>
            </h1>
        </div>
    </section>
);

export default translate(['page'])(Landing);
