import Layout from "../components/MyLayout.js";

const Rooms = (props) => {
  return (
    <Layout>
      <div className="container">
        <h2>Rooms</h2>
        <RoomList />
      </div>
      <style jsx>{`
        .container {
          padding-left: 15px;
          padding-right: 15px;
          margin: 0 auto;
          max-width: 1000px;
        }
      `}</style>
    </Layout>
  );
};

const rooms = [
  {
    id: "rock",
    title: "Rock music",
    description: "The best rock music for you",
    seeds: ["spotify:track:0hCB0YR03f6AmQaHbwWDe8"],
    image_url:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "classical",
    title: "Classical music",
    description: "The best classical music for you",
    seeds: ["spotify:track:0hCB0YR03f6AmQaHbwWDe8"],
    image_url:
      "https://images.unsplash.com/photo-1519682886610-a78e3d518e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "covers",
    title: "Covers",
    description: "The best covers for you",
    seeds: ["spotify:track:0hCB0YR03f6AmQaHbwWDe8"],
    image_url:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
  },
];
const RoomList = () => {
  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>
          <img src={room.image_url} loading="lazy"></img>
          <div className="bottom">
            <div className="bottom-title">{room.title}</div>
            {room.description}
          </div>
        </li>
      ))}
      <style jsx>{`
        ul {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-gap: 1.25rem;
          gap: 1.25rem;
          list-style: none;
          padding: 0;
        }
        li {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          flex-direction: column;
          display: flex;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        img {
          height: 12rem;
          object-fit: cover;
          width: 100%;
        }
        .bottom {
          padding: 1.5rem;
        }
        .bottom-title {
          font-size: 1.1em;
          font-weight: bold;
          padding-bottom: 0.5rem;
        }
      `}</style>
    </ul>
  );
};

export default Rooms;
