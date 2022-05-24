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
import { useState, useEffect } from "react";

import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DataTable from "examples/Tables/DataTable";

//Buttons

// Data
import DataTable from "examples/Tables/DataTable";

import Data from "forms/sales/sacola/data";

export default function Tables(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("product").then((response) => {
            setProducts(response.data.product);
        });
    });

    if (products) {
        const GenericInformation = ({ information }) => (
            <MDTypography variant="caption" color="text" fontWeight="medium" p={3}>
                {information}
            </MDTypography>
        );

        return (
            <DashboardLayout>
                <Grid container spacing={1}>

                    <Card>
                        <MDBox
                            mx={2}
                            mt={2}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                Produtos
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={3}>
                            <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                                < GenericInformation information={"produto"} />
                                < GenericInformation information={"descrição"} />
                                < GenericInformation information={"preço"} />
                                < GenericInformation information={"quantidade"} />
                                < GenericInformation information={"adicionar"} />
                            </MDBox>
                            {
                                products.map(product => (
                                    <Data sale={props.sale} setSale={props.setSale} product={product} />
                                ))
                            }
                        </MDBox>
                    </Card>
                </Grid>
            </DashboardLayout>
        );

    }
    else {
        const { columns, rows } = {
            columns: [
                { Header: "produto", accessor: "name", width: "20%", align: "left" },
                { Header: "descrição", accessor: "description", align: "left" },
                { Header: "preço", accessor: "price", align: "left" },
                { Header: "quantidade", accessor: "quantity", align: "center" },
                { Header: "adicionar", accessor: "acao", align: "center" },
            ],

            rows: [
                {
                    name: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            não encontrado
                        </MDTypography>
                    ),
                    description: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            não encontrado
                        </MDTypography>
                    ),
                    price: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            R$ 0.00
                        </MDTypography>
                    ),
                    quantity: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            0
                        </MDTypography>
                    ),
                    acao: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            -
                        </MDTypography>
                    )
                }
            ]
        }
        return (
            <DashboardLayout>
                <Grid container spacing={6}>

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
                                Produtos
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={3}>
                            <DataTable
                                table={{ columns, rows }}
                                isSorted={false}
                                entriesPerPage={false}
                                showTotalEntries={false}
                                noEndBorder
                            />
                        </MDBox>
                    </Card>


                </Grid>
            </DashboardLayout>
        );

    }
}
