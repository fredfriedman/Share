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
import Login from '../screens/Login/Login'

function mapStateToProps(state, ownProps) {
	return {
		user: state.user,
	}
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
