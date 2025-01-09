'use client'

import { add_analytics, edit_analytics, get_analytics, is_analytics_exist } from "@/app/api/analytics/actions";
import { getSessionUser } from "@/app/api/auth/actions";
import { useState, useEffect } from "react"

export default function AnalyticsDashboard() {
    const [ sdrs, setSdrs ] = useState([])
    const [ counts , setCounts ] = useState([])

    useEffect(() => {
      getUser()
      getPrefillData()
    },[] )

    const getUser = async () => {
      const user_data = await getSessionUser()
      setSdrs([ user_data ])
    }

    const getPrefillData = async () => {
      const stringified_date = getCurrentWeekDates()
      const date = stringified_date.map( e => e.value )

      const ab = await Promise.all( date.map( async e => await get_analytics( e )))

      console.info( 'stringified date >> ', ab )
      setCounts( ab )
    }

    function getCurrentWeekDates() {
    
        const today = new Date();
        const firstDayOfWeek = new Date(today);
        
        // Set the first day (Sunday) of the current week
        firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1);
      
        const weekDates = [];
        for (let i = 0; i < 5 ; i++) {
          const currentDate = new Date(firstDayOfWeek);
          currentDate.setDate(firstDayOfWeek.getDate() + i);
          weekDates.push({text:formatDate(currentDate),value: currentDate});
        }
     
        return weekDates;
    }
      
      // Helper function to format the date as "Month Day"
    function formatDate(date) {
      const options = { month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    async function onChangeAnaytlic ( checked , item ) {
      const user_data = await getSessionUser()
      console.info( 'item is >> ',checked, item )
      const date = new Date(item);

      const analyticsExist = await is_analytics_exist({ analytics_user: user_data.user_id, analytics_date: date })

      if(analyticsExist.length > 0){
        edit_analytics({ 
          analytics_user: user_data.user_id, analytics_date: date, analytics_present: checked
        });
      } else {
         add_analytics({ 
          analytics_user: user_data.user_id, analytics_date: date, analytics_present: checked
        });;
      }
      
    }
    

    //continue on this part
    //get checkbox value
    async function getDefaultValue (analytics_date)  {
      const user_data = sdrs[0]
      const date = new Date( analytics_date );
      console.log(date);

      return true

      const analyticsExist = await is_analytics_exist({
        analytics_user: user_data.user_id,
        analytics_date: date
      })

      console.log("check default",analytics_date , analyticsExist.length > 0 ? true : false);
      return analyticsExist.length > 0 ? true : false;
    }
      
const WeekTable = ({ weekDates, rowLabels }) => {
    return (
      <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>SDR</th>
            {weekDates.map((date, index) => (
              <th key={index} style={{ border: "1px solid #ddd", padding: "8px" }}>{ date.text }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((label, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ border: "1px solid #ddd", padding: "8px", fontWeight: "bold" }}>{label.user_name}</td>
              {weekDates.map((_, colIndex) => (
                <td key={colIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {
                    counts[colIndex]?.analytics_count || '0'
                  }
                  {
                    console.log( counts, colIndex, counts[rowIndex] )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

return <WeekTable
    weekDates={getCurrentWeekDates()}
    rowLabels={sdrs}
/>
}