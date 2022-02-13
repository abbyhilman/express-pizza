import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";

export default function Filter() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  return (
    <div className="container">
      <div className="row justify-content-center m-3 shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-md-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="form-control w-100 mt-1"
            placeholder="search pizza"
          />
        </div>
        <div className="col-md-3">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="form-control w-100 mt-1 "
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
        </div>
        <div className="col-md-3">
          <button
            className="btn w-100 mt-1"
            onClick={() => dispatch(filterPizzas(search, category))}
          >
            FILTER
          </button>
        </div>
      </div>
    </div>
  );
}
