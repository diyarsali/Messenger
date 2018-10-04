import React from 'react';
import '../css/SearchFriend.css';

const SearchFriend = (props) => {
  return (
    <div className="SearchFriend">
      <input type="text" placeholder="Search Friends"  onChange={props.SearchFirends}/>
    </div>
  );
};
export default SearchFriend;
