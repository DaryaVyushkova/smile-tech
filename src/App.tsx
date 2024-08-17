import React, { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import Loader from 'components/Loader'

const UsersPage = lazy(() => import('pages/UsersPage'))

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <Suspense fallback={<Loader />}>
          <UsersPage />
        </Suspense>
      </div>
    </Provider>
  )
}
