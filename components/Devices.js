import React from "react";
import { connect } from "react-redux";
import lang from "../lang/en.json";

import ButtonStyle from "./ButtonStyle";
import ButtonDarkStyle from "./ButtonDarkStyle";
import {
  fetchAvailableDevices,
  transferPlaybackToDevice,
} from "../actions/devicesActions";
import { getIsFetchingDevices } from "../reducers";
import { getDevices } from "../reducers";

const deviceTypeToImage = function (deviceType) {
  switch (deviceType) {
    case "Computer":
      return "/icon-desktop.svg";
    case "Smartphone":
      return "/icon-mobile.svg";
    case "Tablet":
      return "/icon-tablet.svg";
    case "Speaker":
      return "/icon-speaker.svg";
    case "Car":
      return "/icon-car.svg";
    default:
      return "/icon-other.svg";
  }
};

class Devices extends React.PureComponent {
  render() {
    const {
      devices,
      isFetching,
      fetchAvailableDevices,
      transferPlaybackToDevice,
    } = this.props;
    return (
      <div style={{ paddingBottom: "10px" }}>
        <h2>{lang["devices.title"]}</h2>
        <style jsx>{ButtonStyle}</style>
        <style jsx>{ButtonDarkStyle}</style>
        <style jsx>
          {`
            td {
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              padding-top: 0.25rem;
              padding-bottom: 0.25rem;
            }
            tr {
              border: 1px solid #e5e7eb;
            }
          `}
        </style>
        <button
          className="btn btn--dark"
          disabled={isFetching}
          onClick={() => {
            fetchAvailableDevices();
          }}
        >
          {lang["devices.fetch"]}
        </button>
        {devices.length === 0 ? (
          <p>{lang["devices.empty"]}</p>
        ) : (
          <table>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td>
                    <img
                      src={deviceTypeToImage(device.type)}
                      width="32"
                      height="32"
                    />
                  </td>
                  <td>{device.name}</td>
                  <td>
                    {device.is_active ? (
                      <strong>Active -&gt;</strong>
                    ) : (
                      <button
                        onClick={() => {
                          transferPlaybackToDevice(device.id);
                        }}
                      >
                        {lang["devices.transfer"]}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAvailableDevices: (index) => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: (deviceId) =>
    dispatch(transferPlaybackToDevice(deviceId)),
});

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
