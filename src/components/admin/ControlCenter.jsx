import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  Alert,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Dashboard,
  Inventory,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteProduct } from "../../redux/slices/productSlice";

const AdminControlCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDeleteProduct = async (product) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
      )
    ) {
      try {
        await dispatch(deleteProduct(product.id)).unwrap();
        setDeleteSuccess(`Product "${product.name}" deleted successfully!`);
        setTimeout(() => setDeleteSuccess(""), 3000);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  // Calculate stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => {
    const price = parseFloat(product.price) || 0;
    return sum + price;
  }, 0);
  const lowStockProducts = products.filter((product) => product.stock < 10);
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={() => navigate("/")} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Dashboard sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Admin Control Center
        </Typography>
      </Box>

      {/* Success/Error Messages */}
      {deleteSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {deleteSuccess}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h4" component="div">
                {totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4" component="div">
                ${totalValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Low Stock Items
              </Typography>
              <Typography variant="h4" component="div" color="error">
                {lowStockProducts.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Categories
              </Typography>
              <Typography variant="h4" component="div">
                {categories.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
          sx={{
            backgroundColor: "black",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            px: 3,
            py: 1.5,
          }}
        >
          Add New Product
        </Button>
      </Box>

      {/* Products Table */}
      <Paper sx={{ overflow: "hidden" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <Inventory sx={{ mr: 1, verticalAlign: "middle" }} />
            Product Inventory
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>Loading products...</Typography>
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography color="textSecondary">
              No products found. Add your first product to get started!
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    {console.log(product)}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={product.imageUrl}
                          alt={product.name}
                          sx={{ mr: 2, width: 40, height: 40 }}
                          variant="rounded"
                        >
                          {product.name?.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ID: {product.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={product.category}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography fontWeight="bold">
                          ${product.price}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="caption"
                            sx={{ textDecoration: "line-through" }}
                            color="textSecondary"
                          >
                            ${product.originalPrice}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color={product.stock < 10 ? "error" : "textPrimary"}
                        fontWeight={product.stock < 10 ? "bold" : "normal"}
                      >
                        {product.stock}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          product.stock === 0
                            ? "Out of Stock"
                            : product.stock < 10
                            ? "Low Stock"
                            : "In Stock"
                        }
                        color={
                          product.stock === 0
                            ? "error"
                            : product.stock < 10
                            ? "warning"
                            : "success"
                        }
                        size="small"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleEditProduct(product.id)}
                        color="primary"
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteProduct(product)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Low Stock Alert!
          </Typography>
          <Typography variant="body2">
            {lowStockProducts.length} product(s) have low stock (less than 10
            items): {lowStockProducts.map((p) => p.name).join(", ")}
          </Typography>
        </Alert>
      )}
    </Container>
  );
};

export default AdminControlCenter;
