import React from 'react'
import moment from 'moment'

const Notifs = (props) => {
    const { notifs } = props;
    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        {notifs && notifs.map(notif => {
                            return (
                                <li key={notif.id}>
                                    <span className="orange-text">{notif.user} </span>
                                    <span>{notif.content}</span>
                                    <div className="grey-text note-date">
                                        {moment(notif.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifs;