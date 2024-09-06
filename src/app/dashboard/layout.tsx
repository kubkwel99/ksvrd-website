'use client'

import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
            </aside>
            <main className="dashboard-content">
                {children}
            </main>
        </div>

    );
}
