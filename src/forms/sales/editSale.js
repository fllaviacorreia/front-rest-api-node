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

// import Sacola from "producsSelected";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { MenuItem, Select } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";

import Sacola from "forms/sales/sacola";
import RemoverSacola from "forms/sales/removerSacola";

function FormSale() {
    const navigate = useNavigate();
    const { id } = useParams();

    const initClient = {
        id: 0,
        firstname: "",
        lastname: "",
        cpf: "",
        birthdate: "",
        active: true,
    };

    const initEmployee = {
        id: 0,
        firstname: "",
        lastname: "",
        departmentid: 0,
        active: true,
      };

    const initSale = {
        id: 0,
        paymentmethod: "",
        installment: 1,
        totalvalue: 0,
        clientid: 0,
        employeeid: 0,
        products: [],
        latitude: "",
        longitude: "",
    };
    const [client, setClient] = useState(initClient);
    const [employee, setEmployee] = useState(initEmployee);

    const [sale, setSale] = useState(initSale);


    useEffect(() => {
        if (id !== null || id !== "") {
         if(sale.id === 0){
            api.get(`/sale/${id}`).then((response) => {
                const clientAux = {
                    id: response.data.sale.Client.id,
                    firstname: response.data.sale.Client.first_name,
                    lastname: response.data.sale.Client.last_name,
                    cpf: response.data.sale.Client.cpf,
                    birthdate: response.data.sale.Client.birth_date,
                    active: response.data.sale.Client.active,
                }
                setClient({ ...clientAux });

                const employeeAux = {
                    id: response.data.sale.employee.id,
                    firstname: response.data.sale.employee.first_name,
                    lastname: response.data.sale.employee.last_name,
                    departmentid: response.data.sale.employee.departmentId,
                    active: response.data.sale.employee.active,
                  }
                  setEmployee({ ...employeeAux });

                const newProducts = response.data.sale.products.map(product => ({
                    id: product.id,
                    quantity: product.sales_has_product.product_quantity,
                }));

                const saleAux = {
                    id: response.data.sale.id,
                    paymentmethod: response.data.sale.payment_method,
                    installment: response.data.sale.installment,
                    totalvalue: response.data.sale.total_value,
                    clientid: response.data.sale.ClientId,
                    employeeid: response.data.sale.employeeId,
                    products: newProducts,
                    latitude: response.data.sale.latitude,
                    longitude: response.data.sale.longitude,
                }
                setSale({...saleAux});
            });
         }
            
        }
    });


    function onSubmit(ev) {
        ev.preventDefault();
       

        api.patch("/sale", sale).then((response) => {
            alert("Venda alterada com sucesso!");
            navigate("/sales");
        });
    }

    //pode-se adicionar um verificador para confirmar saída.
    function onCancel(ev) {
        navigate("/sales");
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setSale({ ...sale, [name]: value, });
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
                                    Cadastrar nova compra
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
                                                Dados da compra
                                            </MDTypography>
                                        </MDBox>

                                        <MDBox m={3}>
                                            <MDBox m={3} >
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    label="Cliente"
                                                    name="client"
                                                    value={client.firstname}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{
                                                        m: 2,
                                                    }}
                                                />
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    label="CPF"
                                                    name="cpf"
                                                    value={client.cpf}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{
                                                        m: 2,
                                                    }}
                                                />

                                                <TextField
                                                    id="outlined-read-only-input"
                                                    label="Colaborador"
                                                    name="employee"
                                                    value={employee.firstname}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{
                                                        m: 2,
                                                    }}
                                                />

                                                <FormControl sx={{ p: 1, minWidth: 200 }}>
                                                    <InputLabel id="demo-simple-select-autowidth-label" >Forma de pagamento</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        label="Forma de pagamento"
                                                        name="paymentmethod"
                                                        value={sale.paymentmethod}
                                                        onChange={onChange}
                                                    >
                                                        <MenuItem value={""}>Selecione</MenuItem>
                                                        <MenuItem value={"Dinheiro em espécie"}>Dinheiro em espécie</MenuItem>
                                                        <MenuItem value={"Cartão de crédito"}>Cartão de crédito</MenuItem>
                                                        <MenuItem value={"Cartão de débito"}>Cartão de débito</MenuItem>
                                                        <MenuItem value={"PIX"}>PIX</MenuItem>
                                                        <MenuItem value={"TICKEt"}>Ticket</MenuItem>

                                                    </Select>

                                                </FormControl>

                                            </MDBox>
                                            <MDBox m={3}>
                                                <MDInput
                                                    type="number"
                                                    label="Número de prestações"
                                                    name="installment"
                                                    onChange={onChange}
                                                    required="true"
                                                    value={sale.installment}
                                                    sx={{
                                                        m: 2,
                                                    }}
                                                />

                                                <TextField
                                                    id="outlined-read-only-input"
                                                    label="Valor total"
                                                    name="totalvalue"
                                                    value={sale.totalvalue}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{
                                                        m: 2,
                                                    }}
                                                />

                                                <TextField
                                                    id="outlined-read-only-input"
                                                    label="Latitude"
                                                    name="latitude"
                                                    value={sale.latitude}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{
                                                        m: 2,
                                                    }}
                                                />

                                                <TextField
                                                    id="outlined-read-only-input"
                                                    label="Longitude"
                                                    name="longitude"
                                                    value={sale.longitude}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{
                                                        m: 2,
                                                    }}
                                                />
                                            </MDBox>


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
                                <MDBox display="flex" justifyContent="space-between" m={2}>
                                    {/* <Sacola sale={sale} setSale={setSale} /> */}
                                    <RemoverSacola sale={sale} setSale={setSale} />
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default FormSale;
