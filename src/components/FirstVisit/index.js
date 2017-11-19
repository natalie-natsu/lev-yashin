import React from 'react';

const FirstVisit = () => (
    <div className="first-visit">
        <div
            className="modal fade"
            id="modal-first-visit"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="First-visit"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Oh, this is your first visit !
                        </h5>
                    </div>
                    <div className="modal-body container" />
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-dismiss="modal">
                            <i className="fa fa-check-circle-o" /> Agreed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default FirstVisit;
