import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import { authObserver, getUserData } from "@MF-Org/apiHelpers";
import NavBar from './components/NavBar';



const Root = () => {

	return (
		<BrowserRouter>
			<NavBar
			/>
		</BrowserRouter>
	);
};
export default Root;
