import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuTop from "./components/MenuTop";

// Pages
import Home from "./pages/home";
import NewMoviews from "./pages/new-movies";
import Popular from "./pages/popular";
import Search from "./pages/search";
import Movie from "./pages/movie";
import Error404 from "./pages/error404";
import NewMovies from "./pages/new-movies";

export default function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: "1" }}>
          <MenuTop />
        </Header>

        <Content>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/new-movies" exact={true} component={NewMovies} />
            <Route path="/popular" exact={true} component={Popular} />
            <Route path="/search" exact={true} component={Search} />
            <Route path="/movie/:id" exact={true} component={Movie} />
            <Route path="*" component={Error404} />
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}
