import { useState } from "react";


import { Icon } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import MDInput from "components/MDInput";

function Data(props) {
    const product = props.product
    const [quantity, setQuantity] = useState(0);

    function onClickAdd(id, quantity, value) {
        const products = props.sale.products;
        const verify = products.filter(product => product.id === id)

        if (verify.lenght > 0) {
            products.forEach(function (item) {
                if (item.id === id) {
                    item.quantity = item.quantity + quantity
                }
            });
        } else {
            //adicionando novo produto ao array em sale
            products.push({
                id: id,
                quantity: quantity,
            });
        }

        props.setSale({ ...props.sale, "products": products });

        //somando total atual
        var total = props.sale.totalvalue + (quantity * value);
        props.setSale({ ...props.sale, "totalvalue": total });
        setQuantity(0);
    }

    function handleChange(ev) {
        setQuantity(ev.target.value);
    }

    const GenericInformation = ({ information }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium" m={2}>
            {information}
        </MDTypography>
    );

    return (
        <MDBox display="flex" justifyContent="space-between" p={2}>
            <GenericInformation information={product.product_name} />
            <GenericInformation information={product.description} />
            <MDTypography variant="caption" color="text" fontWeight="medium">
                R$ {product.price}
            </MDTypography>
            <MDInput
                type="number"
                label="Quantidade"
                name="quantity"
                value={quantity}
                onChange={handleChange}
                widht={70}
            />

            <MDBox>
                <MDButton variant="text" color="info" onClick={() => onClickAdd(product.id, quantity, product.price)}>
                    <Icon>addcirclerounded</Icon>
                </MDButton>
            </MDBox>
        </MDBox>

    )

}
export default Data;