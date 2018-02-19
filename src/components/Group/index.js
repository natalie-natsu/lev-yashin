import React from 'react';
import { some } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import countries from 'i18n-iso-countries';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStar, faHashtag } from '@fortawesome/fontawesome-free-solid';

import { localeTo } from '../../helpers/locales';
import './Group.scss';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

const getStars = (team) => {
    const stars = [];
    for (let i = team.nbChampion || 0; i > 0; i -= 1) {
        const star = <span key={`star-${i}`} className="star text-neutral"><FontAwesomeIcon icon={faStar} /></span>;
        stars.push(star);
    }
    return stars;
};

const Group = ({ addOnTitle, className, i18n, id, onTeamClick, t, teams }) => (
    <div className={classNames(`table-responsive group ${id}`, className)} data-group-id={id}>
        <table className={classNames('table table-striped mb-0', { 'table-hover': onTeamClick })}>
            <thead>
                <tr>
                    <th scope="col">
                        <h5 className="d-inline">
                            <span className="badge bg-white group-id">{id}</span>
                        </h5>
                    </th>
                    <th scope="col"><FontAwesomeIcon icon={faHashtag} /></th>
                    <th scope="col">{t('component:Group.th.name')}</th>
                    <th scope="col" className="text-right"><FontAwesomeIcon icon={faStar} /></th>
                    {some(teams, team => team.addOn) &&
                        <th scope="col">{addOnTitle || t('component:Group.th.addOn')}</th>
                    }
                </tr>
            </thead>
            <tbody>
                {teams.map((team, index) => (
                    <tr
                        key={team.id}
                        tabIndex={onTeamClick && index}
                        role={onTeamClick ? 'button' : 'row'}
                        data-team-id={team.id}
                        className={classNames('group-team', { clickable: onTeamClick })}
                        onClick={() => onTeamClick && onTeamClick(team)}
                        onKeyPress={() => onTeamClick && onTeamClick(team)}
                    >
                        <td><span className={`my-1 flag-icon flag-icon-${team.flagIcon}`} /></td>
                        <th scope="row">{team.id}</th>
                        <td>{countries.getName(team.flagIcon, localeTo(i18n.language, 'i18n'))}</td>
                        <td className="text-right">{getStars(team)}</td>
                        {team.addOn && <td>{team.addOn}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

Group.propTypes = {
    addOnTitle: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
    onTeamClick: PropTypes.func,
    t: PropTypes.func.isRequired,
    teams: PropTypes.arrayOf(PropTypes.shape({
        addOn: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
        flagIcon: PropTypes.string,
        id: PropTypes.string.isRequired,
        nbChampion: PropTypes.number,
        rank: PropTypes.number,
    })).isRequired,
};

Group.defaultProps = {
    addOnTitle: null,
    className: '',
    onTeamClick: null,
};

export default translate()(Group);
