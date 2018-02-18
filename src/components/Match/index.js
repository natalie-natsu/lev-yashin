import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { translate } from 'react-i18next';
import countries from 'i18n-iso-countries';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCircle } from '@fortawesome/fontawesome-free-solid';
import { faClock } from '@fortawesome/fontawesome-free-regular';

import { localeTo } from '../../helpers/locales';
import '../Group/Group.scss';
import './Match.scss';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

const Match = ({
    className, i18n, against, city, datetime, group, id, live, scores, stadium, team, timezone, t,
}) => (
    <div className={classNames(`match match-${id}`, className)} data-match-id={id}>
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-2">
                {group && (<span className={`badge mr-2 bg-white group ${group.id}`}>{group.id}</span>)}
                {team ? team.id : t('undefined')}-{against ? against.id : t('undefined')}
            </h5>
            <small className={live ? 'live text-primary text-strong' : 'not-live'}>
                <FontAwesomeIcon icon={live ? faCircle : faClock} className="mr-2" />
                {live
                    ? t('component:Match.live')
                    : moment.tz(datetime, timezone).tz(moment.tz.guess()).format('DD MMM HH:mm')
                }
            </small>
        </div>
        <div className="row mb-1 body">
            <div className="col-3 col-sm-4">
                <div className="team text-left">
                    <div className={`mr-auto flag-icon flag-icon-${team.flagIcon}`} />
                    <small className="name team-name font-italic">
                        {countries.getName(team.flagIcon, localeTo(i18n.language, 'i18n'))}
                    </small>
                </div>
            </div>
            <div className="col-3 col-sm-2 d-flex">
                <div
                    className={classNames('score score-team align-self-center mx-auto badge', {
                        'badge-secondary': !live && !scores,
                        'badge-primary': live,
                        'badge-complementary': !live && scores && scores.team > scores.against,
                        'badge-light': !live && scores && scores.team <= scores.against,
                    })}
                >
                    {scores ? scores.team : '-'}
                </div>
            </div>
            <div className="col-3 col-sm-2 d-flex">
                <div
                    className={classNames('score score-against align-self-center mx-auto badge', {
                        'badge-secondary': !live && !scores,
                        'badge-complementary': live,
                        'badge-neutral': !live && scores && scores.against > scores.team,
                        'badge-light': !live && scores && scores.against <= scores.team,
                    })}
                >
                    {scores ? scores.against : '-'}
                </div>
            </div>
            <div className="col-3 col-sm-4">
                <div className="against text-right">
                    <div className={`ml-auto flag-icon flag-icon-${against.flagIcon}`} />
                    <small className="name against-name font-italic">
                        {countries.getName(against.flagIcon, localeTo(i18n.language, 'i18n'))}
                    </small>
                </div>
            </div>
        </div>
        <small className="location">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            {stadium} - {city}
        </small>
    </div>
);

Match.propTypes = {
    against: PropTypes.shape({
        flagIcon: PropTypes.string,
        id: PropTypes.string.isRequired,
        nbChampion: PropTypes.number,
        rank: PropTypes.number,
    }).isRequired,
    city: PropTypes.string,
    className: PropTypes.string,
    datetime: PropTypes.string.isRequired,
    group: PropTypes.shape({ id: PropTypes.string, teams: PropTypes.arrayOf(PropTypes.object) }),
    id: PropTypes.number.isRequired,
    i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
    live: PropTypes.bool,
    scores: PropTypes.shape({
        against: PropTypes.number.isRequired,
        team: PropTypes.number.isRequired,
        penaltyShootOut: PropTypes.any,
    }),
    stadium: PropTypes.string,
    team: PropTypes.shape({
        flagIcon: PropTypes.string,
        id: PropTypes.string.isRequired,
        nbChampion: PropTypes.number,
        rank: PropTypes.number,
    }).isRequired,
    timezone: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

Match.defaultProps = {
    city: '',
    className: '',
    group: null,
    live: false,
    scores: null,
    stadium: '',
};

export default translate()(Match);
