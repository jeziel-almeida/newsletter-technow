"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DefaultProvidersProps {
    children: ReactNode;
}

const DefaultProviders = ({ children }: DefaultProvidersProps) => {

    const client = new QueryClient();

    return (
        <>
            <QueryClientProvider client={client}>
                {children}
                <ToastContainer
                    position={"top-right"}
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </QueryClientProvider>
        </>
    )
}

export default DefaultProviders