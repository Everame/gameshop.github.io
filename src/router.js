import React from "react";
import {
    createBrowserRouter
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import GamePage from "./pages/GamePage/GamePage";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from './pages/DetailPage/DatailPage';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage/>
    },
    {
        path: '/game/:slug',
        element: <GamePage/>
    },
    {
        path: '/genres',
        element: <ListPage type="genres"/>
    },
    {
        path: '/developers',
        element: <ListPage type="developers"/>
    },
    {
        path: '/genres/:slug',
        element: <DetailPage type="genres"/>
    },
    {
        path: '/developers/:slug',
        element: <DetailPage type="developers"/>
    }
],{ basename: "/gameshop" })

