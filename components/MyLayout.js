import Header from './Header';
import Head from 'next/head';

const Layout = props => (
  <div>
    <style jsx>{`
      div {
        color: #333;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 15px;
      }
    `}</style>
    <Header />
    <div>
      {props.children}
    </div>
  </div>
);

export default Layout;
