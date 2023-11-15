import React, {useState} from "react";
import {
    Paper,
    InputBase,
    ToggleButtonGroup,
    ToggleButton, Button
} from "@mui/material";
import Typography from "@mui/material/Typography";

type ILoginData = {
    login: string,
    password: string,
    type: string,
}

const Login = ({setLoginRequest} : any) => {
    const [loginData, setLoginData] = useState<ILoginData>({
        login: "",
        password: "",
        type: "pupil",
    })

    return (
        <section className="content">
            <ToggleButtonGroup
                color="primary"
                value={loginData.type}
                exclusive
                onChange={(_, target) => {
                    if (target !== null) {
                        setLoginData({...loginData, type: target});
                    }
                }}
                fullWidth
            >
                <ToggleButton value="pupil">Ученик</ToggleButton>
                <ToggleButton value="parent">Родитель</ToggleButton>
            </ToggleButtonGroup>
            <Paper
                component="form"
                sx={{ margin: '1em 0', display: 'flex', alignItems: 'center', width: "100%", height: "3em" }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Логин"
                    onChange={(event) => {
                        setLoginData({...loginData, login: event.target.value})
                    }}
                />
            </Paper>
            <Paper
                component="form"
                sx={{ margin: '1em 0', display: 'flex', alignItems: 'center', width: "100%", height: "3em" }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    type="password"
                    placeholder="Пароль"
                    value={loginData.password}
                    onChange={(event) => {
                        setLoginData({...loginData, password: event.target.value})
                    }}
                />
            </Paper>
            <Button
                variant="contained"
                onClick={() => {
                    setLoginRequest(loginData)
                    setLoginData({
                        login: "",
                        password: "",
                        type: "pupil",
                    })
                }}
                fullWidth
            >
                Войти
            </Button>
            <Typography sx={{marginTop: "1em"}} color={"info.main"}>
                *капча проходится автоматически
            </Typography>
        </section>
    )
}

export default Login;