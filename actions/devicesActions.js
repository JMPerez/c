import * as types from '../constants/ActionTypes';

export const fetchAvailableDevices = () => ({
  type: types.FETCH_AVAILABLE_DEVICES
});
export const fetchAvailableDevicesSuccess = list => ({
  type: types.FETCH_AVAILABLE_DEVICES_SUCCESS,
  list
});
export const fetchAvailableDevicesError = error => ({
  type: types.FETCH_AVAILABLE_DEVICES_ERROR,
  error
});

export const transferPlaybackToDevice = deviceId => ({
  type: types.TRANSFER_PLAYBACK_TO_DEVICE,
  deviceId
});
export const transferPlaybackToDeviceSuccess = list => ({
  type: types.TRANSFER_PLAYBACK_TO_DEVICE_SUCCESS
});
export const transferPlaybackToDeviceError = list => ({
  type: types.TRANSFER_PLAYBACK_TO_DEVICE_ERROR,
  error
});
