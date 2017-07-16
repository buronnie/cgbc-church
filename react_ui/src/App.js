import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './routes/home';
import NewOffer from './routes/finance/NewOffer';
import EditOffer from './routes/finance/EditOffer';
import ListOffers from './routes/finance/ListOffers';
import { apiUrl } from './config/api';
import { setApiUrl } from './factories/auth';

class App extends Component {
  componentDidMount() {
    setApiUrl(apiUrl);
  }

  render() {
    return (
      <LocaleProvider locale={en_US}>
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/finance/offers/new' component={NewOffer}/>
            <Route exact path='/finance/offers/:id' component={EditOffer}/>
            <Route exact path='/finance/offers' component={ListOffers}/>
          </Switch>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
