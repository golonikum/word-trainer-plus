import { connect } from "react-redux"
import * as userActions from "../../actions/users"
import SelectLanguage from "../pure/SelectLanguage"

const mapStateToProps = state => 
    ({ 
        user: state.user,
        languages: state.languages,
    })

export default connect(
    mapStateToProps,
    userActions
)(SelectLanguage)