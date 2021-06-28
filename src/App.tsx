import React, { ReactNode } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAppContext } from './app-context'
import './App.css'
import { homeUrl, loginUrl, newsUrl } from './constants/routes'
import { StyledApp, StyledAppContent } from './styled'
import SideBar from './ui/components/SideBar'
import Home from './ui/pages/Home'
import Login from './ui/pages/Login'
import News from './ui/pages/News'

const CheckLogin: React.FC<{ children: any }> = (props) => {
  const { store } = useAppContext();
  if (!store.user.isAuth) return <Redirect to={loginUrl} />
  return props.children;
}

function App() {
  return (
    <div className="App">
      <StyledApp>
        <SideBar />
        <StyledAppContent>
          <Switch>
            <Route exact path={homeUrl} component={Home} />
            <Route exact path={loginUrl} component={Login} />
            <CheckLogin>
              <Route exact path={newsUrl} component={News} />
              <Route exact path={`${newsUrl}/:author/page:page`} component={News} />
              <Route exact path={`${newsUrl}/page:page`} component={News} />
            </CheckLogin>
          </Switch>
        </StyledAppContent>
      </StyledApp>
    </div>
  )
}

export default App
