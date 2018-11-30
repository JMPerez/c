import React from 'react';

class User extends React.PureComponent {
  render() {
    const { user } = this.props;
    const userName = user.display_name || user.id;
    const index = user.id;
    const radioMasterId = -1;
    return (
      <div>
        <style jsx>{`
          .user-list__item {
            display: block;
            margin-bottom: 0.5em;
          }
          .user-image {
            border-radius: 50%;
          }
          .user-name {
            line-height: 30px;
          }
          .media,
          .media__bd {
            overflow: hidden;
            _overflow: visible;
            zoom: 1;
          }
          .media .media__img {
            float: left;
            margin-right: 10px;
          }
        `}</style>
        <li key={index} className="user-list__item media">
          <div>
            <button
              className="btn btn--dark"
              disabled={radioMasterId === user.id}
              onClick={() => {
                fetchAvailableDevices();
              }}
            >
              Radio Master
            </button>
          </div>
          <div className="media__img">
            <img
              className="user-image"
              src={(user.images && user.images.length && user.images[0].url) || '/static/user-icon.png'}
              width="30"
              height="30"
              alt={userName}
              title={userName}
            />
          </div>
          <div className="user-name media__bd">{userName}</div>
        </li>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

export default User;
