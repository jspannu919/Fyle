import "./App.css";
import Table from "./components/Table";
import { debounce } from "./utils/AppUtils";
import { Input, Select } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";

const { Option } = Select;

function App() {
  const [branches, setBranches] = useState([]);
  const [state, setState] = useState("Any");
  const [city, setCity] = useState("Any");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  let filteredData = [];

  useEffect(() => {
    axios.get("/api/branches").then(({ data }) => {
      setBranches(data);
      setLoading(false);
    });
  }, []);

  //filter data IIFE
  (function filter() {
    //filter as per state
    if (state !== "Any") {
      if (city !== "Any") {
        filteredData = branches.filter(
          (branch) => branch.state === state && branch.city === city
        );
      } else {
        filteredData = branches.filter((branch) => branch.state === state);
      }
    } else filteredData = branches;

    //filter as per search
    if (searchText.length) {
      filteredData = filteredData.filter((branch) => {
        let shouldInclude = false;
        Object.keys(branch).forEach((key) => {
          if (key === "favourite") {
          } else if (key === "bank_id")
            shouldInclude |= branch[key] === Number(searchText);
          else shouldInclude |= branch[key].includes(searchText);
        });
        return shouldInclude;
      });
    }
  })();

  //fetch cities as per state selected
  function getCities() {
    if (state !== "Any") {
      let cities = new Set();
      branches.forEach((branch) => {
        if (branch.state === state) cities.add(branch.city);
      });
      return [...cities].sort().map((city) => (
        <Option key={city} value={city}>
          {city}
        </Option>
      ));
    } else return [];
  }

  //get states from data
  function getStates() {
    let states = new Set();
    branches.forEach((branch) => states.add(branch.state));
    return [...states].sort().map((state) => (
      <Option key={state} value={state}>
        {state}
      </Option>
    ));
  }

  //when user changes state
  function stateChangeHandler(newState) {
    setState(newState);
    setCity("Any");
  }

  //when user types in search bar
  function searchHandler(e) {
    let text = e.target.value;
    if (Number.isNaN(Number(text))) setSearchText(text.toUpperCase());
    else setSearchText(text);
  }

  return (
    <div className="app">
      {loading ? (
        <LoadingOutlined className="loadingIcon" />
      ) : (
        <>
          <h1>Branches</h1>
          <div className="searchContainer">
            <div className="citySearch">
              <label htmlFor="state">State: </label>
              <Select
                value={state}
                className="stateSearchBar"
                onChange={stateChangeHandler}
              >
                <Option value="Any" key="any">
                  Any
                </Option>
                {getStates()}
              </Select>

              <label htmlFor="city">City: </label>
              <Select
                value={city}
                className="citySearchBar"
                onChange={setCity}
                disabled={state === "Any"}
              >
                <Option value="Any" key="any">
                  Any
                </Option>
                {getCities()}
              </Select>
            </div>
            <Input
              size="large"
              placeholder="Search"
              className="searchBar"
              onChange={debounce(searchHandler)}
              prefix={<SearchOutlined />}
            />
          </div>
          <Table branches={filteredData} />
        </>
      )}
    </div>
  );
}

export default App;
