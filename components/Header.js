import Link from "next/link";
import { connect } from "react-redux";
import { login } from "../actions/sessionActions";
import ButtonStyle from "./ButtonStyle";
import ButtonDarkStyle from "./ButtonDarkStyle";
import lang from "../lang/en.json";

const linkStyle = {
  lineHeight: "30px",
  marginRight: 15,
};

const mainLinkStyle = {
  float: "left",
  marginRight: "10px",
};

const headerStyle = {
  backgroundColor: "#e3ebf4",
  padding: "20px 40px",
};

const getNameFromUser = (user) => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div style={headerStyle}>
    <Link href="/">
      <a style={Object.assign({}, linkStyle, mainLinkStyle)}>
        <img src="/c-icon-128.png" height="30" />
      </a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>{lang["about"]}</a>
    </Link>
    {session.user ? (
      <div className="media user-header">
        <style jsx>{`
          .user-header {
            float: right;
            width: 150px;
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
        <div className="media__img">
          <img
            className="user-image"
            src={
              (session.user.images &&
                session.user.images.length &&
                session.user.images[0].url) ||
              "/user-icon.png"
            }
            width="30"
            height="30"
            alt={getNameFromUser(session.user)}
          />
        </div>
        <div className="user-name media__bd">
          {getNameFromUser(session.user)}
        </div>
      </div>
    ) : (
      <button
        className="btn btn--dark"
        style={{ float: "right" }}
        onClick={login}
      >
        <style jsx>{ButtonStyle}</style>
        <style jsx>{ButtonDarkStyle}</style>
        Login
      </button>
    )}
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback()),
});

const mapStateToProps = (state) => ({
  session: state.session,
  muted: state.playback.muted,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
