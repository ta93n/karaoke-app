import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <div className="sidebar-top">
      </div>
      <div className="menu">
        <div className="add-song-button">
          <Link to="/create">
            <button>曲を登録する</button>
          </Link>
        </div>
        <nav>
          <li>
            <Link to="/">TOP</Link>
          </li>
          <li>
            <Link to="/songs">保存した曲リスト</Link>
          </li>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
