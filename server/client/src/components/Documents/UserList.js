import React from 'react';

export function UserList({ users }) {
    

    return (
        <div className="UserList-container">
            <div className="UserList-toolbar">
                <></>
            </div>
            <div className="Table-container">
                <table className="user-table">
                    <thead>
                        <tr className="user-table-head">
                            <th className="user-name-head-col"><b>Name</b></th>
                            <th className="user-email-head-col"><b>Email</b></th>
                            <th className="user-phone-head-col"><b>Phone</b></th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="user-table-row">
                            <td className="user-table-name-col">{user.name}</td>
                            <td className="user-table-email-col">{user.email}</td>
                            <td className="user-table-phone-col">{user.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}