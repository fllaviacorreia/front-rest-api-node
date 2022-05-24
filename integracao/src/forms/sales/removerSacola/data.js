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
    const [quantity, setQuantity] = useState(props.product.quantity); 

    const initProduct = {
        id: 0,
        productname: "",
        price: "",
        description: "",
        technicalinformation: "",
        quantity: 0,
        sectionid: 0,
        active: true,    
      };
    
      const [productDB, setProductDB] = useState(initProduct);

    useEffect(() => {    
        api.get(`/product/${product.id}`).then((response) => {
          const productAux = {
            id: response.data.product.id,
            productname: response.data.product.product_name,
            price: response.data.product.price,
            description: response.data.product.description,
            technicalinformation: response.data.product.technical_information,
            quantity: response.data.product.quantity,
            sectionid: response.data.product.SectionId,
            active: response.data.product.active,
          }
          setProductDB({ ...productAux });

        }); 
  });

  console.log(productDB)
    function onClickRemove(id) {
        const products = props.sale.products;
        products.forEach(function (product) {
            if (product.id === id) {
                let quantityAtual = product.quantity
                let total = 0;
                
                if (quantity < 1) {
                    //subtraindo do total atual                    
                    total = props.sale.totalvalue - (quantityAtual * product.price);
                    props.setSale({ ...props.sale, "totalvalue": total });
                    product.quantity = 0;                  
                } 
                else if (quantity > 0 && quantity < product.quantity) {
                    //subtraindo quando não são todos os produtos removidos
                    total = props.sale.totalvalue - ((quantityAtual - quantity) * productDB.price);
                    props.setSale({ ...props.sale, "totalvalue": total });
                    product.quantity = quantity;
                }
            }
        });

        if (quantity < 1) {
            const newProducts = products.filter(product => product.quantity > 0);
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
            <GenericInformation information={productDB.productname} />
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