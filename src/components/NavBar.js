import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { authObserver, getUserData } from "@MF-Org/apiHelpers";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";


const NavBar = () => {

    const navigate = useNavigate()

    const [authToken, setToken] = React.useState(null);

    React.useEffect(() => {

        authObserver.subscribe(({ token }) => {

            if (!token && window.location.pathname !== "/login") navigate("/login");

            // call API
            getUserData(token).then(response => {

                if (response) {
                    if ((!response.error) && (response.user)) {
                        setToken(token)
                        console.log("authToken-IF", authToken, token)

                    }
                }

            })


        })

        return () => {
            // WARNING : DO NOT DO THIS
            // authObserver.unsubscribe()
        }
    }, [])


    return (

        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            authToken
                                ? (
                                    <>
                                        <Button
                                            component={Link}
                                            sx={{ my: 2, color: 'white', display: 'block', }}
                                            to="/"
                                        >
                                            {"home"}
                                        </Button>
                                        <Button
                                            component={Link}
                                            sx={{ my: 2, color: 'white', display: 'block', }}
                                            to="/dashboard"
                                        >
                                            {"Dashboard"}
                                        </Button>
                                        <Button
                                            sx={{ my: 2, color: 'white', display: 'block', }}
                                            onClick={(e) => {

                                                authObserver.next({
                                                    token: null
                                                })

                                                localStorage.clear()

                                                setToken(null)
                                                
                                            }}
                                        >
                                            {"Logout"}
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        component={Link}
                                        sx={{ my: 2, color: 'white', display: 'block', }}
                                        to="/login"
                                    >
                                        {"Login"}
                                    </Button>
                                )
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
