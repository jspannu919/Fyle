import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "../Table";
import axios from "axios";

const Bank = (props) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let bankId = params.id;

  useEffect(() => {
    axios.get("/api/banks/" + bankId).then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, [bankId]);

  return loading ? (
    <LoadingOutlined className="loadingIcon" />
  ) : (
    <div className="app">
      <img src="/assets/images/bank.svg" alt="bank" width={100} />
      <h1>{data.name || "Bank Not Found"}</h1>
      <h4>Total Branches: {data.branches ? data.branches.length : 0}</h4>
      <Table branches={data.branches || []} />
    </div>
  );
};

export default Bank;
