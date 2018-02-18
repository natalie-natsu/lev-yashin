import React from 'react';
import { some } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import countries from 'i18n-iso-countries';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';

import { localeTo } from '../../helpers/locales';
import './Group.scss';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

const Group = ({ addOnTitle, className, i18n, id, t, teams }) => (
    <div className={classNames(`group group-${id}`, className)} data-group-id={id}>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t('component:Group.th.id')}</th>
                    <th scope="col">{t('component:Group.th.name')}</th>
                    <th scope="col">{t('component:Group.th.rank')}</th>
                    <th scope="col">{t('component:Group.th.achievement')}</th>
                    {some(teams, team => team.addOn) &&
                        <th scope="col">{addOnTitle || t('component:Group.th.addOn')}</th>
                    }
                </tr>
            </thead>
            <tbody>
                {teams.map(team => (
                    <tr key={team.id} data-team-id={team.id} className="group-team">
                        <td className={`flag-icon flag-icon-${team.flagIcon}`} />
                        <th scope="row">{team.id}</th>
                        <td>{countries.getName(team.flagIcon, localeTo(i18n.language, 'i18n'))}</td>
                        <td>{t('component:Group.td.rank', { rank: team.rank })}</td>
                        <td>
                            {() => {
                                const stars = [];
                                for (let i = team.nbChampion || 0; i > 0; i -= 1) {
                                    const star = (
                                        <span className="star text-neutral">
                                            <FontAwesomeIcon className={faStar} />
                                        </span>
                                    );
                                    stars.push(star);
                                }
                                return stars;
                            }}
                        </td>
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
    id: PropTypes.number.isRequired,
    i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
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
};

export default translate()(Group);
