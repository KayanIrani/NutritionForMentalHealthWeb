import React from 'react';
import helplineData from './helplineData.json';
import styles from './css/GlobalStyles.module.css'
const HelpLine = () => {
  return (
    <div className={styles.tableContainer} >
      {/* <h1>HELPLINE NUMBERS FOR PwDs</h1> */}
      <h1>HELPLINES FOR EVERYONE'S WELL-BEING</h1>
      <p>In times of emotional distress, psychological crisis, or mental health challenges, immediate support can make a life-saving difference.
        <br />
        The following helpline numbers have been compiled specifically for persons with individuals in need, offering assistance ranging from counseling and crisis intervention to suicide prevention and rehabilitation. These services are confidential, free of cost, and accessible across India. 
        <br />
        Whether you're seeking help for yourself or someone you care about, these helplines are here to listen and support without judgment.</p>
        <p><a href="https://depwd.gov.in/en/others-helplines/" target='_blank' style={{textDecoration: 'none','color': '#4dcb64'}}>Credits</a></p>
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
