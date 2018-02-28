import React from 'react';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/fontawesome-free-solid';

import { failFetchMatches, fetchMatches, successFetchMatches } from '../../actions/entities/match';
import { matchListSchema } from '../../schemas/match';
import { routes } from '../../helpers/routes';

import './Calendar.scss';
import SideAction from '../../components/MainHeader/SideAction';
import Title from '../../components/MainHeader/Title';
import CalendarList from '../../components/Calendar/List';

class Calendar extends React.Component {
    componentDidMount() {
        if (this.props.calendar.matches.length < 1) { this.fetchCalendar(); }
    }

    fetchCalendar(e) {
        if (e) { e.preventDefault(); }

        const { calendar, dispatch } = this.props;

        if (!calendar.isFetching) {
            const scope = routes.calendar;
            dispatch(fetchMatches({}, scope, (response) => {
                if (response.error) dispatch(failFetchMatches(response, scope));
                else dispatch(successFetchMatches(response, scope));
            }));
        }
    }

    render() {
        const { calendar, t } = this.props;
        return (
            <div id="calendar">
                <Title>{t('page:Calendar.title')}</Title>
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button
                            type="button"
                            className="btn"
                            disabled={calendar.isFetching}
                            onClick={e => this.fetchCalendar(e)}
                            onKeyPress={e => this.fetchCalendar(e)}
                        >
                            <FontAwesomeIcon icon={faSync} spin={calendar.isFetching} />
                        </button>
                    </div>
                </SideAction>
                <div className="container">
                    <CalendarList {...calendar} />
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendar: PropTypes.shape({
        matches: PropTypes.arrayOf(PropTypes.object),
        isFetching: PropTypes.bool,
        needRefresh: PropTypes.bool,
        receivedAt: PropTypes.number,
    }).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({
        credentials: state.credentials,
        calendar: {
            ...state.pages.Calendar,
            matches: denormalize(map(state.entities.matches, m => m.id), matchListSchema, state.entities),
        },
    }),
    dispatch => ({ dispatch }),
)(Calendar));
