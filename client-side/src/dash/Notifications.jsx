import React from 'react';
import Dashboard from "../components/Dashboard";
import { useNotifications } from '../NotificationsContext';
import "./DashCSS/Notifications.css"
import { HiBell, HiX } from 'react-icons/hi'

function Notifications() {
  const { notifications, setNotifications } = useNotifications()

  const deleteNotif = (i) => {
    const updated = [...notifications]
    updated.splice(i, 1)
    setNotifications(updated)
  }

  return (
    <>
      <section className="main">
        <div className="dashboard-parent">
          <Dashboard />
        </div>
        <div className="content-main main-child ml-2 p-8">
          <h2 className='notif-head'>Notifications</h2>
          {/* {console.log(notifications)} */}
          
          {notifications.length == 0 ? <span className='text-darkred mt-10 text-xl'>No new notifications to show</span> : notifications.map((e, i) => (
          <span key={i} className='notif-bar flex flex-col items-center'>
            <span className='notif-each flex m-3 p-5 items-center justify-between'>
            <div className='flex items-center hover:cursor-pointer'>
              <HiBell className="h-8 w-8 text-cyan-800" />
              <div className="pl-4 mr-3 hover:underline">{e}</div>
            </div>
            <HiX  onClick={() => deleteNotif(i)} className='p-1 text-3xl hover:bg-gray-200 duration-300 rounded-xl hover:cursor-pointer'/>
            </span>
          </span>
          ))}

        </div>
      </section>
    </>
  )
}

export default Notifications
