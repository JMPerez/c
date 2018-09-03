import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';
class Devices extends React.PureComponent {
  render() {
    const { devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice } = this.props;
    return (
      <div style={{ paddingBottom: '10px' }}>
        <h2><FormattedMessage id="devices.title" /></h2>
        <style jsx>
          {ButtonStyle}
        </style>
        <style jsx>
          {ButtonDarkStyle}
        </style>
        <button
          className="btn btn--dark"
          disabled={isFetching}
          onClick={() => {
            fetchAvailableDevices();
          }}
        >
          <FormattedMessage id="devices.fetch" />
        </button>
        {devices.length === 0
          ? <p><FormattedMessage id="devices.empty" /></p>
          : <table>
              <tbody>
                {devices.map(device => (
                  <tr>
                    <td>
                      {device.is_active
                        ? <strong>Active -&gt;</strong>
                        : <button
                            onClick={() => {
                              transferPlaybackToDevice(device.id);
                            }}
                          >
                            <FormattedMessage id="devices.transfer" />
                          </button>}
                    </td>
                    <td>
                      {device.name}
                    </td>
                    <td>
                      {device.type}
                    </td>
                    <td>
                      {device.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: deviceId => dispatch(transferPlaybackToDevice(deviceId))
});

const mapStateToProps = state => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
