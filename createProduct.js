require("dotenv").config();
const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_URL,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

const createProduct = async () => {
  const mutation = `
  mutation{
  productCreate(input: {
    title: "Dave New GraphQL Product"
    bodyHtml: "<strong>Great Product!</strong>"
    vendor: "Your Vendor Name"
    productType: "Your Product Type"
    tags: ["Tag1", "Tag2"]
    variants: [{
      title: "Default Title"
      price: "19.99"
      sku: "SKU1234"
    }]
  }) {
    product {
      id
      title
    }
    userErrors {
      field
      message
      }
    }
  }`;
  try {
    const response = await shopify.graphql(mutation);
    console.log("Product created:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

createProduct();