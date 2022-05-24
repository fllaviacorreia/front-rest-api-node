import { useState, useEffect } from "react";
import api from "services/api";

import { Icon } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import MDInput from "components/MDInput";

function Data(props) {
    const product = props.product
    const [quantity, setQuantity] = useState(props.product.sales_has_product.product_quantity);   

    function onClickRemove(id) {
        console.log(quantity)
        const products = props.sale.products;
        products.forEach(function (product) {
            if (product.id === id) {
                console.log(product)

                let quantityAtual = product.sales_has_product.product_quantity
                let total = 0;
                console.log(quantityAtual)
                if (quantity < 1) {
                    //subtraindo do total atual                    
                    total = props.sale.totalvalue - (quantityAtual * product.price);
                    props.setSale({ ...props.sale, "totalvalue": total });
                    product.sales_has_product.product_quantity = 0;                  
                } 
                else if (quantity > 0 && quantity < product.sales_has_product.product_quantity) {
                    //subtraindo quando não são todos os produtos removidos
                    total = props.sale.totalvalue - ((quantityAtual - quantity) * product.price);
                    props.setSale({ ...props.sale, "totalvalue": total });
                    product.sales_has_product.product_quantity = quantity;
                }
            }
        });

        if (quantity < 1) {
            const newProducts = products.filter(product => product.sales_has_product.product_quantity > 0);

            console.log(newProducts)
            props.setSale({ ...props.sale, "products": newProducts });    
        }
    }

    function handleChange(ev) {
        setQuantity(ev.target.value);
    }

    const GenericInformation = ({ information }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium" m={2} p={3}>
            {information}
        </MDTypography>
    );

    return (
        <MDBox display="flex" justifyContent="space-between" p={2}>
            <GenericInformation information={product.product_name} />
            <MDInput
                type="number"
                label="Quantidade"
                name="quantity"
                value={quantity}
                onChange={handleChange}
                widht={80}
            />

            <MDBox>
                <MDButton variant="text" color="error" onClick={() => onClickRemove(product.id, quantity)}>
                    <Icon>removecirclerounded</Icon>
                </MDButton>
            </MDBox>
        </MDBox>

    )

}
export default Data;