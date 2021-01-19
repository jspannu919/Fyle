import "./Table.css";
import { parseLabel } from "./../../utils/AppUtils";
import { Table as TableComp, Rate } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

const Table = ({ branches }) => {
  const [favourites, setFavourites] = useState(
    localStorage.getItem("favList")
      ? JSON.parse(localStorage.getItem("favList"))
      : []
  );

  localStorage.setItem("favList", JSON.stringify(favourites));

  function getColumns() {
    let columns = [];
    if (branches.length) {
      Object.keys(branches[0]).forEach((key) => {
        columns.push({
          title: parseLabel(key),
          dataIndex: key,
          key: key,
        });
      });
      columns.push({
        title: parseLabel(key),
        dataIndex: key,
        key: key,
        filters: [
          { text: "Favourite Only", value: "Favourite" },
          { text: "All", value: "All" },
        ],
        onFilter: (selected, record) => {
          if (selected === "Favourite") {
            return favourites.indexOf(record.ifsc) !== -1;
          } else {
            return true;
          }
        },
      });
    }
    return columns;
  }

  function handleFavourite(selected, ifscCode) {
    if (selected) {
      setFavourites([...favourites, ifscCode]);
    } else {
      setFavourites(favourites.filter((ifsc) => ifsc !== ifscCode));
    }
  }

  function formatData() {
    return branches.map((branch, ind) => {
      if (ind > 50) return branch;
      branch["bank_id"] = (
        <Link to={"/bank/" + branch["bank_id"]}>{branch["bank_id"]}</Link>
      );
      branch["favourite"] = (
        <Rate
          value={favourites.indexOf(branch["ifsc"]) !== -1 ? 1 : 0}
          count={1}
          onChange={(selected) => handleFavourite(selected, branch["ifsc"])}
        />
      );
      return branch;
    });
  }

  return (
    <TableComp
      columns={getColumns()}
      dataSource={formatData()}
      rowKey="ifsc"
      className="table"
    />
  );
};

export default Table;
