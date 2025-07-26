import React, { useEffect } from "react";
import api from "../services/api";
import { useState } from "react";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const res = await api.get("/logs");

        if (res.status !== 200) throw new Error(res.data.message);

        setLogs(
          res.data.map((log) => {
            let newDate = log.createdAt;
            newDate = newDate.split("T")[0];
            let hour = log.createdAt.split("T")[1].split(".")[0];

            return {
              ...log,
              date: newDate,
              hour,
            };
          })
        );
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    };

    getLogs();
  }, []);

  return (
    <section className="container logs ">
      <ul className="logs_list">
        {logs.map((log) => {
          return (
            <li key={log.log_id}>
              <div className="log_container">
                <h3>Name</h3>
                <p>
                  {log.user.firstname} {log.user.lastname}
                </p>
              </div>

              <div className="log_container">
                <h3>Role</h3>
                <p>{log.user.role}</p>
              </div>

              <div className="log_container">
                <h3>Action</h3>
                <p>{log.action}</p>
              </div>

              <div className="log_container">
                <h3>On table</h3>
                <p>{log.table_affected}</p>
              </div>

              <div className="log_container">
                <h3>On id</h3>
                <p>{log.affected_id}</p>
              </div>

              <div className="log_container">
                <h3>Date</h3>
                <p>{log.date}</p>
                <p>{log.hour}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {/* <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
            <th>On table</th>
            <th>On id</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.log_id}>
              <td>
                {log.user.firstname} {log.user.lastname}
              </td>
              <td>{log.user.role}</td>
              <td>{log.action}</td>
              <td>{log.table_affected}</td>
              <td>{log.affected_id}</td>
              <td>
                {log.date} {log.hour}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </section>
  );
}

export default Logs;
