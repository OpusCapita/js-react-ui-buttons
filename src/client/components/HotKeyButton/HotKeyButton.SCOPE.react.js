import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'jcatalog-showroom';
import HotKeyButton from './HotKeyButton.react';

function requireAll(requireContext) {
  return requireContext.keys().map(key => ({
    name: key.replace(/(\.svg$|^\.\/)/gi, ''),
    svg: requireContext(key)
  }));
}

let icons = requireAll(require.context( '!!raw-loader!jcatalog-svg-icons/lib', true, /.*\.svg$/));

@showroomScopeDecorator
class HotKeyButtonSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons,
      containerStyle: {},
      options: {
        isPaper: false
      }
    };
  }

  getIcon(name) {
   return this.state.icons.find(icon => icon.name === name).svg
  }

  toggleOption(name) {
    this.setState({
      options: { ...this.state.options, [name]: !this.state.options[name] }
    });
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <HotKeyButton
            altContent={this.state.options.isPaper ? (
              <div style={{ display: 'flex', alignText: 'center', alignItems: 'center' }}>
                Disable Paper
              </div>
            ) : null}
            label="Enable Paper"
            onClick={() => this.toggleOption.call(this, 'isPaper')}
          />
        </div>
        <div>
          {this._renderChildren()}
        </div>
      </div>
    );
  }
}

export default HotKeyButtonSCOPE;