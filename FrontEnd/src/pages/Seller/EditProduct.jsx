import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets, categories } from "../../assets/assets";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const EditProduct = () => {
  const { id } = useParams();
  const { axios, navigate, fetchProducts } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    price: "",
    offerPrice: "",
    category: "",
    description: "",
    inStock: true
  });

  // 4 image slots
  const [files, setFiles] = useState([null, null, null, null]);
  const [oldImages, setOldImages] = useState([]);

  // =========================
  // Load existing product
  // =========================
  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/id?id=${id}`);      

      if (data.success) {
        const p = data.product;

        setForm({
          name: p.name,
          price: p.price,
          offerPrice: p.offerPrice,
          category: p.category,
          description: Array.isArray(p.description)
            ? p.description.join(", ")
            : p.description,
          inStock: p.inStock
        });

        setOldImages(p.image || []);
      }

    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // Submit Update
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      // add form fields
      Object.entries(form).forEach(([k, v]) => {
        if (k === "description") {
          fd.append(k, JSON.stringify(v.split(",").map(x => x.trim())));
        } else {
          fd.append(k, v);
        }
      });

      // add only changed images
      files.forEach(file => {
        if (file) fd.append("images", file);
      });

      const { data } = await axios.put(
        `/api/product/update/${id}`,
        fd
      );

      if (data.success) {
        toast.success("Product Updated");
        fetchProducts();
        navigate("/loader?next=seller/product-list");
      } else {
        toast.error(data.message);
      }

    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
  try {

    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirm) return;

    const { data } = await axios.delete(
      `/api/product/delete/${id}`
    );

    if (data.success) {
      toast.success("Product deleted");
      fetchProducts();
      navigate("/seller/product-list");
    } else {
      toast.error(data.message);
    }

  } catch (err) {
    toast.error(err.message);
  }
};


  
  // UI

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={form.name}
            onChange={e=>setForm({...form, name:e.target.value})}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
          <input
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            type="number"
            value={form.price}
            onChange={e=>setForm({...form, price:e.target.value})}
          />
        </div>

        {/* Offer Price */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-price">Offer Price</label>
          <input
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            type="number"
            value={form.offerPrice}
            onChange={e=>setForm({...form, offerPrice:e.target.value})}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1 max-w-md">
          <p className="text-base font-medium mb-1">Category</p>
          <select
              value={form.category}
              onChange={(e)=>setForm({...form, category:e.target.value})}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
          <option value="">Select Category</option>
          
          {categories.map((item, index)=>(
            <option key={index} value={item.path}>
              {item.path}
            </option>
          ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={form.description}
            onChange={e=>setForm({...form, description:e.target.value})}
          />
        </div>

        {/*IMAGE GRID UPLOADER */}
        <div>
          <p className="text-base font-medium">Product Images</p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`} className="w-25 h-16 flex items-center justify-center cursor-pointer hover:border-primary transition">
                    
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const updated = [...files];
                    updated[index] = e.target.files[0];
                    setFiles(updated);
                  }}
                />

                <img src={files[index] ? URL.createObjectURL(files[index]) : oldImages[index] || assets.upload_area} alt=""/>

              </label>
            ))}
          </div>
        </div>

        {/* Stock toggle */}
        {/* <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={e=>setForm({...form, inStock:e.target.checked})}
          />
          In Stock
        </label> */}

        {/* Submit */}
        <div className="flex flex-row space-x-3">

          <button className="rounded bg-primary text-white px-4 py-2 hover:bg-primary-dull transition cursor-pointer">
            Update Product
          </button>

          <button 
            type='button'
            onClick={()=>navigate('/seller/product-list')} 
            className="rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
          >Cancel</button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition cursor-pointer"
          >Remove Product</button>

        </div>
      </form>
    </div>
  );
};

export default EditProduct;
