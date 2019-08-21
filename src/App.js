import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import PlayerBoard from './containers/PlayerBoard/PlayerBoard';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <PlayerBoard/>
        </Layout>
      </div>
    );
  }
}

export default App;
