import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Avatar from 'react-avatar';
import { Link, ServerRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOtherUsers } from '../redux/userSlice';
import { useSelector } from 'react-redux';


export const RightSideBarMobile = ({  }) => {
  let [Search, setSearch] = useState("");

  const {user,otherUsers} = useSelector(store => store.user)

  const searchUsers = otherUsers?.filter((user) =>
    user.name.toLowerCase().includes(Search.toLowerCase())
  );

  return (
    <div className="w-full md:w-[24%] min-w-[250px]  p-3">
      {/* Search Bar */}
      <div className="p-2 bg-gray-200 rounded-full flex items-center  text-gray-500">
        <CiSearch size={"20px"} />
        <input
          type="text"
          className="ml-2 bg-transparent outline-none px-2 w-full"
          placeholder="Search"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Who to Follow */}
      <div className="p-3 bg-gray-200 rounded-2xl my-2 w-full">
        <h1 className="font-bold">Who To Follow</h1>
        <div className=" flex-col w-full mt-4 h-auto">
          {searchUsers?.map((user) => (
            <div
              key={user?._id}
              className="flex flex-row items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <Avatar
                  src="https://img.freepik.com/premium-photo/3d-animation-style-cute-baby-saying-hello_911201-11230.jpg"
                  size="40"
                  round={true}
                />
                <div className="flex flex-col">
                  <h1 className="font-bold text-sm">{user?.name}</h1>
                  <p className="text-xs text-gray-500">@{user?.username}</p>
                </div>
              </div>

              {/* Profile Button */}
              <Link to={`/profile/${user?._id}`}>
                <button className="rounded-full bg-zinc-900 px-4 py-1 text-white text-sm hover:bg-zinc-800">
                  Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
