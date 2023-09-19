import DashboardLayout from '@/components/DashboardLayout';
import React from 'react'

const Admin = () => {
  return (
    <div>Welcome to Admin</div>
  )
}

export default Admin;

Admin.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}