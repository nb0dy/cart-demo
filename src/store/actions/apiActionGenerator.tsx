import { Dispatch } from 'redux'
type ApiCall = (args: any) => Promise<any>

const apiActionGenerator = (
  apiCall: ApiCall,
  successAction: string,
  failureAction: string,
  inProgressAction?: string,
  apiParams?: any
) => {
  return (dispatch: Dispatch) => {
    if (!!inProgressAction) {
      dispatch({ type: inProgressAction })
    }

    apiCall(apiParams)
      .then(result => {
        dispatch({ type: successAction, payload: result.data })
      })
      .catch(e => dispatch({ type: failureAction, payload: e }))
  }
}

export default apiActionGenerator
