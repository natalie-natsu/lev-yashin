import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { filter, last } from 'lodash';
import { translate } from 'react-i18next';
import { faCrosshairs } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import './CalendarList.scss';
import Match from '../../Match';
import FloatingActionButton from '../../FloatingActionButton';

class CalendarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { scrollTo: props.scrollTo || this.getScrollTo(props.matches) };
    }

    componentWillReceiveProps(nextProps) {
        const { matches } = nextProps;
        if (matches !== this.props.matches) { this.setState({ scrollTo: this.getScrollTo(matches) }); }
    }

    componentDidUpdate(prevProps, prevState) {
        const { scrollTo } = this.state;
        if (prevState.scrollTo !== scrollTo) { this.scrollTo(scrollTo, prevState.scrollTo && 'smooth'); }
    }

    getScrollTo(matches = this.props.matches) {
        if (matches.length < 1) { return false; }

        const lastMatchWithScores = last(filter(matches, match => match.scores));
        return lastMatchWithScores ? lastMatchWithScores.id : 1;
    }

    scrollTo(scrollTo = this.state.scrollTo, behavior) {
        const el = scrollTo && this[`match-${scrollTo}`];
        if (el) { el.scrollIntoView(behavior && { behavior }); }
    }

    renderMatches() {
        return this.props.matches.map((match) => {
            const { id } = match;
            return (
                <div
                    id={id}
                    key={id}
                    ref={(el) => { this[`match-${id}`] = el; }}
                    className="list-group-item list-group-item-action flex-column align-items-start"
                >
                    <Link
                        to={routes.match.replace(':id', id)}
                        className="list-group-item-action"
                    >
                        <Match {...match} />
                    </Link>
                </div>
            );
        });
    }

    render() {
        const { matches, t } = this.props;
        return matches.length > 0 && (
            <div className="calendar-list">
                <FloatingActionButton
                    fa={faCrosshairs}
                    className="btn-complementary"
                    onClick={() => this.scrollTo(undefined, 'smooth')}
                />
                <div className="list-group mb-3">{this.renderMatches()}</div>
                <p className="mb-3 text-center">{t('component:CalendarList.endOfList')}</p>
            </div>
        );
    }
}

CalendarList.propTypes = {
    // game: PropTypes.shape({
    //     _id: PropTypes.string.isRequired,
    //     name: PropTypes.string.isRequired,
    //     users: PropTypes.arrayOf(PropTypes.object).isRequired,
    //     teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    // }),
    i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
    // isFetching: PropTypes.bool.isRequired,
    matches: PropTypes.arrayOf(PropTypes.object),
    // receivedAt: PropTypes.number,
    scrollTo: PropTypes.number,
    t: PropTypes.func.isRequired,
    // userId: PropTypes.string,
};

CalendarList.defaultProps = {
    // games: [],
    matches: [],
    // onRefresh: null,
    // receivedAt: null,
    scrollTo: null,
    // userId: null,
};

export default translate()(CalendarList);
