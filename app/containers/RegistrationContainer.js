/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as authActions from '../actions/auth/authActions'
import * as globalActions from '../actions/Actions'


// Component
import Signup from '../screens/Login/signup'

function mapStateToProps(state, ownProps) {
	return {
		state: state.state,
	}
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
