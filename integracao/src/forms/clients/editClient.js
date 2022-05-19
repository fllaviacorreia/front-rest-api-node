/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from "react-router-dom";
import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";


function FormClient() {
    const { id } = useParams();
    const navigate = useNavigate();

    // const { firstname, lastname, cpf, birthdate } = req.body
    // const { number, street, district, city, state, country, zipcode } = req.body

    const initClient = {
        id: 0,
        firstname: "",
        lastname: "",
        cpf: "",
        birthdate: "",
        active: true,
    };

    const [client, setClient] = useState(initClient);
    const [sentinela, setSentinela] = useState(false);

    //get para alteração de usuários
    useEffect(() => {
        if (id !== null || id !== "") {
            if (!sentinela) {
                api.get(`/client/${id}`).then((response) => {
                    var formatter = new Date(response.data.client.birth_date).toISOString().split('T')[0];
                    const clientAux = {
                        id: response.data.client.id,
                        firstname: response.data.client.first_name,
                        lastname: response.data.client.last_name,
                        cpf: response.data.client.cpf,
                        birthdate: formatter,
                        active: response.data.client.active,
                    }
                    setClient({ ...clientAux });

                });
                setSentinela(true);
            }
        }
    }, [id, sentinela]);


    function onSubmit(ev) {
        ev.preventDefault();
        api.patch("/client", client).then((response) => {
            alert("Cliente alterado com sucesso!");
            navigate("/clients");
        });
    }

    //pode-se adicionar um verificador para confirmar saída.
    function onCancel(ev) {
        navigate("/clients");
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setClient({ ...client, [name]: value, });
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Alterar cliente
                                </MDTypography>
                            </MDBox>

                            <MDBox m={4}>
                                <form onSubmit={onSubmit}>
                                    <MDBox m={5}>
                                        <MDBox
                                            mx={2}
                                            mt={-3}
                                            py={3}
                                            px={2}
                                            variant="gradient"
                                            bgColor="light"
                                            borderRadius="lg"
                                            coloredShadow="secondary"
                                        >
                                            <MDTypography variant="h6" color="black">
                                                Dados pessoais
                                            </MDTypography>
                                        </MDBox>
                                        <MDBox m={3}>
                                            <MDInput
                                                type="text"
                                                label="Nome"
                                                name="firstname"
                                                size="large"
                                                onChange={onChange}
                                                required="true"
                                                value={client.firstname}
                                                sx={{
                                                    m: 2,
                                                }}
                                            />

                                            <MDInput
                                                type="text"
                                                label="Sobrenome"
                                                name="lastname"
                                                onChange={onChange}
                                                required="true"
                                                value={client.lastname}
                                                sx={{
                                                    m: 2,
                                                }}
                                            />
                                            <MDInput
                                                type="date"
                                                label="Data de nascimento"
                                                name="birthdate"
                                                onChange={onChange}
                                                value={client.birthdate}
                                                required="true"
                                                sx={{
                                                    p: 2,
                                                }}
                                            />
                                            <MDBox m={3}>
                                                <InputMask
                                                    placeholder="CPF *"
                                                    name="cpf"
                                                    mask='999.999.999-99'
                                                    value={client.cpf}
                                                    onChange={onChange}
                                                    required="true">
                                                </InputMask>
                                            </MDBox>

                                            <Select p={5}
                                                placeholder="Situação"
                                                name="active"
                                                value={client.active}
                                                onChange={onChange}
                                                displayEmpty
                                            >
                                                <MenuItem value="">Selecione</MenuItem>
                                                <MenuItem value="true">Ativo</MenuItem>
                                                <MenuItem value="false">Inativo</MenuItem>
                                            </Select>


                                        </MDBox>
                                    </MDBox>

                                    <MDBox m={5} p={5}>
                    <MDButton type="submit" color="info">
                      Atualizar
                    </MDButton>
                    &nbsp;&nbsp;&nbsp;
                    <MDButton color="info" onClick={() => onCancel()}>Cancelar</MDButton>
                  </MDBox>
                                </form>
                            </MDBox>
                        </Card>
                    </Grid>

                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default FormClient;
