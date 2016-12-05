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
import Overview from '../screens/Home/components/overview'

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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
