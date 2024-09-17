import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/authState';

const Dashboard = () => {
    const router = useRouter();
    const { user, loading, logout } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
          router.push('/login');
        }
    }, [user, loading, router]);

    const onLogout = async () => {
        logout()
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Dashboard Placeholder</p>
            <button onClick={onLogout} className='mt-10'>
                Signout
            </button>
        </div>
    )

}

export default Dashboard;