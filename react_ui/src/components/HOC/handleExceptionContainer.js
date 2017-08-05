import React, {Component} from 'react';
import { Spin } from 'antd';
import My401Page from '../../components/exceptions/My401Page';
import My404Page from '../../components/exceptions/My404Page';

const handleExceptionContainer = (MyComponent, loadData) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        status: 'loading',
      }
    }

    componentDidMount() {
      loadData(this);
    }

    render() {
      switch(this.state.status) {
        case 'loading':
          return <Spin className="loading-spin" />;
        case 'success':
          return (
            <MyComponent
              {...this.props}
              {...this.state}
              dataSource={this.state.offers}
            />
          );
        case 'Unauthorized':
          return <My401Page />;
        default:
          return <My404Page />;
      }
    }
  }
};
export default handleExceptionContainer;
