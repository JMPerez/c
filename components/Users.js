import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ items }) => {
  return (
    <div>
      <style jsx>{`
        .user-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
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
        .header-2 {
          color: #999;
          font-size: 11px;
          text-transform: uppercase;
        }
      `}</style>
      <h2 className="header-2"><FormattedMessage id="online" /></h2>
      <ul className="user-list">
        {items.map((i, index) => {
          const userName = i.display_name || i.id;
          return (
            <li key={index} className="user-list__item media">
              <div className="media__img">
                <img
                  className="user-image"
                  src={(i.images && i.images.length && i.images[0].url) || '/static/user-icon.png'}
                  width="30"
                  height="30"
                  alt={userName}
                  title={userName}
                />
              </div>
              <div className="user-name media__bd">
                {userName}
              </div>
            </li>
          );
        })}
      </ul>
      <div style={{ clear: 'both' }} />
    </div>
  );
};
