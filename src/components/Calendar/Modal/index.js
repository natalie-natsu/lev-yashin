import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { denormalize } from 'normalizr';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/fontawesome-free-solid';

import CalendarMatch from '../Match';
import { routes } from '../../../helpers/routes';
import { calendarSchema } from '../../../schemas/calendar';

const $ = window.jQuery;

class CalendarModal extends React.Component {
    componentDidMount() {
        $('#calendar-modal').modal();
    }

    componentWillUnmount() {
        $('#calendar-modal').modal('dispose');
    }

    render() {
        const { data } = this.props;
        return (
            <div
                id="calendar-modal"
                className="modal animated slideInDown"
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                            <Link to={routes.calendar.exact} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </Link>
                        </div>
                        <div className="modal-body">
                            {data
                                ? <CalendarMatch {...data} />
                                : <FontAwesomeIcon icon={faCircleNotch} size="lg" spin />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
CalendarModal.propTypes = {
    data: PropTypes.shape({
        against: PropTypes.shape({
            flagIcon: PropTypes.string,
            id: PropTypes.string.isRequired,
            nbChampion: PropTypes.number,
            rank: PropTypes.number,
        }).isRequired,
        city: PropTypes.string,
        datetime: PropTypes.string.isRequired,
        group: PropTypes.shape({ id: PropTypes.string, teams: PropTypes.arrayOf(PropTypes.string) }),
        id: PropTypes.number.isRequired,
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
    }),
};

CalendarModal.defaultProps = {
    data: null,
};

export default connect((state, ownProps) => ({
    data: state.entities.matches && denormalize([ownProps.match.params.id], calendarSchema, state.entities)[0],
}))(CalendarModal);
