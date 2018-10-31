import { types } from '../actions'

import ui from './uiReducer'
import auth from './authReducer'
import login from './loginReducers'
import registration from './registrationReducers'
import siteNavigation from './siteNavigationReducers'
import generateReducer from './generateReducer'

const rootReducer =
  {
    ui,
    auth,
    login,
    registration,
    siteNavigation,
    pages: generateReducer(types.SITE_PAGE),
    roles: generateReducer(types.USER_ROLE),
    sponsors: generateReducer(types.SPONSOR),
    userAccounts: generateReducer(types.USER_ACCOUNT),
    events: generateReducer(types.EVENT),
    files: generateReducer(types.FILE),
    fileUploads: generateReducer(types.FILE_UPLOAD)
  }

export default rootReducer
