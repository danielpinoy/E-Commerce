import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Edit, Save, ArrowBack, Preview } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  updateProduct,
  clearError,
} from "../../redux/slices/productSlice";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    imageUrl: "",
    colors: [],
    sizes: [],
    tags: "",
  });

  const [success, setSuccess] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const categories = [
    "Shirts",
    "Jeans",
    "Tees",
    "Denim",
    "Sweaters",
    "Accessories",
    "Shoes",
    "Jackets",
  ];

  const commonSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const commonColors = [
    "Black",
    "White",
    "Navy",
    "Gray",
    "Beige",
    "Brown",
    "Sage",
  ];

  // Load product data when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  // Populate form when product data is loaded
  useEffect(() => {
    if (currentProduct) {
      setProduct({
        name: currentProduct.name || "",
        description: currentProduct.description || "",
        price: currentProduct.price?.toString() || "",
        originalPrice: currentProduct.originalPrice?.toString() || "",
        category: currentProduct.category || "",
        stock: currentProduct.stock?.toString() || "",
        imageUrl: currentProduct.imageUrl || "",
        colors: currentProduct.colors || [],
        sizes: currentProduct.sizes || [],
        tags: Array.isArray(currentProduct.tags)
          ? currentProduct.tags.join(", ")
          : currentProduct.tags || "",
      });
    }
  }, [currentProduct]);

  const handleChange = (field) => (event) => {
    setProduct({
      ...product,
      [field]: event.target.value,
    });
  };

  const addColor = () => {
    if (newColor && !product.colors.includes(newColor)) {
      setProduct({
        ...product,
        colors: [...product.colors, newColor],
      });
      setNewColor("");
    }
  };

  const removeColor = (colorToRemove) => {
    setProduct({
      ...product,
      colors: product.colors.filter((color) => color !== colorToRemove),
    });
  };

  const addSize = () => {
    if (newSize && !product.sizes.includes(newSize)) {
      setProduct({
        ...product,
        sizes: [...product.sizes, newSize],
      });
      setNewSize("");
    }
  };

  const removeSize = (sizeToRemove) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter((size) => size !== sizeToRemove),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    dispatch(clearError());

    try {
      // Prepare product data
      const productData = {
        ...product,
        price: parseFloat(product.price),
        originalPrice: product.originalPrice
          ? parseFloat(product.originalPrice)
          : null,
        stock: parseInt(product.stock),
        storeId: currentProduct.storeId || 1,
        tags:
          typeof product.tags === "string"
            ? product.tags
            : product.tags.join(", "), // Convert array to string
      };

      // Dispatch updateProduct thunk
      await dispatch(updateProduct({ productId: id, productData })).unwrap();

      setSuccess(`Product "${product.name}" updated successfully!`);

      // Navigate back to admin after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  if (loading && !currentProduct) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading product...</Typography>
      </Container>
    );
  }

  if (error && !currentProduct) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading product: {error}
          <Button onClick={() => navigate("/admin")} sx={{ ml: 2 }}>
            Back to Admin
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Main Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <IconButton onClick={() => navigate("/admin")} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Edit sx={{ mr: 2, fontSize: 32 }} />
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: "bold" }}
                >
                  Edit Product
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {id}
                </Typography>
              </Box>
            </Box>

            {/* Success/Error Messages */}
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Basic Info */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    Basic Information
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    value={product.name}
                    onChange={handleChange("name")}
                    required
                    placeholder="e.g., The Organic Cotton Crew"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={product.description}
                    onChange={handleChange("description")}
                    multiline
                    rows={4}
                    placeholder="Describe your product in detail..."
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    value={product.price}
                    onChange={handleChange("price")}
                    required
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                    placeholder="0.00"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Original Price (Optional)"
                    type="number"
                    value={product.originalPrice}
                    onChange={handleChange("originalPrice")}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                    placeholder="0.00"
                    helperText="For sale items"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    type="number"
                    value={product.stock}
                    onChange={handleChange("stock")}
                    required
                    placeholder="0"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={product.category}
                      onChange={handleChange("category")}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange("imageUrl")}
                    placeholder="https://example.com/image.jpg"
                    helperText="Paste a direct link to your product image"
                  />
                </Grid>

                {/* Colors */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    Colors & Sizes
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <TextField
                        label="Add Color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        size="small"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addColor())
                        }
                      />
                      <Button onClick={addColor} variant="outlined">
                        Add
                      </Button>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      {commonColors.map((color) => (
                        <Chip
                          key={color}
                          label={color}
                          onClick={() => {
                            if (!product.colors.includes(color)) {
                              setProduct({
                                ...product,
                                colors: [...product.colors, color],
                              });
                            }
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ cursor: "pointer" }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {product.colors.map((color) => (
                        <Chip
                          key={color}
                          label={color}
                          onDelete={() => removeColor(color)}
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <TextField
                        label="Add Size"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        size="small"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addSize())
                        }
                      />
                      <Button onClick={addSize} variant="outlined">
                        Add
                      </Button>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      {commonSizes.map((size) => (
                        <Chip
                          key={size}
                          label={size}
                          onClick={() => {
                            if (!product.sizes.includes(size)) {
                              setProduct({
                                ...product,
                                sizes: [...product.sizes, size],
                              });
                            }
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ cursor: "pointer" }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {product.sizes.map((size) => (
                        <Chip
                          key={size}
                          label={size}
                          onDelete={() => removeSize(size)}
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tags (comma separated)"
                    value={product.tags}
                    onChange={handleChange("tags")}
                    placeholder="organic, cotton, sustainable, comfortable"
                    helperText="Separate tags with commas"
                  />
                </Grid>

                {/* Submit Buttons */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={<Save />}
                      sx={{
                        backgroundColor: "black",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                        px: 4,
                        py: 1.5,
                      }}
                    >
                      {loading ? "Updating..." : "Update Product"}
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Preview sx={{ mr: 1 }} />
              Live Preview
            </Typography>

            {product.imageUrl && (
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
                sx={{ mb: 2, borderRadius: 1 }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}

            {product.name ? (
              <>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {product.name}
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    ${product.price || "0.00"}
                  </Typography>
                  {product.originalPrice && (
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      ${product.originalPrice}
                    </Typography>
                  )}
                </Box>

                {product.description && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: "text.secondary" }}
                  >
                    {product.description}
                  </Typography>
                )}

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Category: {product.category || "Not selected"}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    Stock: {product.stock || 0}
                  </Typography>
                </Box>

                {product.colors.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                      Colors:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {product.colors.map((color) => (
                        <Chip key={color} label={color} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}

                {product.sizes.length > 0 && (
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                      Sizes:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {product.sizes.map((size) => (
                        <Chip key={size} label={size} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                Loading product data...
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProduct;
