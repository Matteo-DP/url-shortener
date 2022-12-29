import React from 'react'
import PrivateRoute from '../src/components/auth/PrivateRoute'
import DashboardComponent from '../src/components/DashboardComponent'

export default function Dashboard() {
    return (
        <PrivateRoute>
            <DashboardComponent />
        </PrivateRoute>
    )
}
