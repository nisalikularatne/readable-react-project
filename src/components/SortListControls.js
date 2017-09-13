import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/post_action';

import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

class SortListControls extends Component {

    sortByDate() {
        this.props.setSortingPreferenceByDate({type: actions.SET_SORTING_PREFERENCE_BY_DATE});
        const {onByDate} = this.props;
        if (onByDate) {
            onByDate();
        }
    }

    sortByScore() {
        this.props.setSortingPreferenceByScore({type: actions.SET_SORTING_PREFERENCE_BY_SCORE});
        const {onByScore} = this.props;
        if (onByScore) {
            onByScore();
        }
    }

    getActiveButton() {
        const {sorting} = this.props.preference;
        if (sorting) {
            return (sorting === 'byDate') ? 1 : 2;
        }
        return 0;
    }

    render() {
        return (
            <div className="sortButtons">
                <h4>Sort Posts</h4>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={this.getActiveButton()}>
                        <ToggleButton value={1} onClick={() => {this.sortByDate()}}><strong>By Date</strong> </ToggleButton>
                        <ToggleButton value={2} onClick={() => {this.sortByScore()}}><strong>By Score</strong> </ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>
            </div>
        )
    }
}

function mapStateToProps ({preference}) {
    return {preference}
}

function mapDispatchToProps (dispatch) {
    return {
        setSortingPreferenceByDate: () => dispatch(actions.setSortingPreferenceByDate()),
        setSortingPreferenceByScore: () => dispatch(actions.setSortingPreferenceByScore()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortListControls);