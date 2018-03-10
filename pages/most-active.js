import React from 'react';
import axios from 'axios';

import Nav from '../components/nav';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  static async getInitialProps({ req }) {
    try {
      return {};
    } catch (e) {}
  }

  render() {
    return <div>hi!</div>;
  }
}
