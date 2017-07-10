import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
// components
import Icon from '../../icons';
import MakeGameFirstStep from './firstStep';
import MakeGameProgress from './progress';
// actions
import { handleSubmit, handleInputChange } from './actions';
// styles
import styles from './makeGame.scss';

function mapStateToProps(appState) {
  return {
    rootState: appState.rootState,
    makeGameState: appState.makeGame,
  };
}

class MakeGame extends React.PureComponent {
  render() {
    const { makeGameState, match } = this.props;

    return (
      <div className={styles.makeGameContainer}>
        <Icon className={styles.makeSlotIcon} icon="MAKE_SLOT" />
        <MakeGameProgress currentStep={makeGameState.get('currentStep')} />
        <Switch>
          <Route exact path={match.url} component={MakeGameFirstStep} />
        </Switch>
      </div>
    );
  }

  handleInputChange(e, type) {
    const { dispatch } = this.props;
    const targetValue = e.currentTarget.value;

    dispatch(handleInputChange(type, targetValue));
  }

  handleSubmit(e) {
    const { dispatch, makeGame } = this.props;
    e.preventDefault();

    const params = {
      slotName: makeGame.get('slotName'),
      minimumValue: makeGame.get('minimumValue'),
      playerChance: makeGame.get('playerChance'),
      maximumValue: makeGame.get('maximumValue'),
      deposit: makeGame.get('deposit'),
    };

    dispatch(handleSubmit(params));
  }
}

export default withRouter(connect(mapStateToProps)(MakeGame));
