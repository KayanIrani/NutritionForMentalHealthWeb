import React from 'react';
import helplineData from './helplineData.json';
import styles from './css/GlobalStyles.module.css'
const HelpLine = () => {
  return (
    <div className={styles.tableContainer} >
      <h1>HELPLINE NUMBERS FOR PwDs</h1>
      <table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Name of the Helpline</th>
            <th>Number</th>
            <th>Purpose / Target Group</th>
          </tr>
        </thead>
        <tbody>
          {helplineData.map((helpline) => (
            <tr key={helpline.slNo}>
              <td>{helpline.slNo}</td>
              <td>{helpline.name}</td>
              <td>{helpline.number}</td>
              <td>{helpline.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HelpLine;
