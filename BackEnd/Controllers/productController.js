import {v2 as cloudinary} from 'cloudinary'
import Product from "../Models/Product.js"

const makeSafeFolder = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};

//add product: /api/product/add
export const addProduct=async (req,res)=>{
    try {
        let productData=JSON.parse(req.body.productData)

        const images=req.files

        const safeCategory = makeSafeFolder(productData.category);

        let imagesUrl=await Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path, { resource_type: 'image', folder: `GroceryApp/${safeCategory}`});
                return result.secure_url
            })
        )
            await Product.create({...productData, image: imagesUrl})

            res.json({
                success:true,   
                message:"Product Added"
            })
        
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false, 
            message: error.message

        })
    }
}

//get product: /api/product/list
export const productList=async (req,res)=>{
    try {
        const products =await Product
        .find({})
        .sort({ category: 1, name: 1 });
        
        res.json({success:true, products})
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false, 
            message: error.message

        })
    }
}

//get single product: /api/product/id
export const productById=async (req,res)=>{
    try {
        const {id}=req.query

        const product =await Product.findById(id)

        if (!product) {
            return res.json({
            success: false,
            message: "Product not found"
        });
    }

        res.json({
            success:true, 
            product
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false, 
            message: error.message

        })
    }
}

//change product inStock: /api/product/stock
export const changeStock=async (req,res)=>{
    try {
        const {id, inStock} =req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({
            success: true,
            message:"Stock Updated"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false, 
            message: error.message

        })
    }
}


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      offerPrice,
      category,
      inStock
    } = req.body;


    const updateData = {
      name,
      description: JSON.parse(description),
      price,
      offerPrice,
      category,
      inStock
    };

    const safeCategory = makeSafeFolder(category);  //fetch category

     if (req.files && req.files.length > 0) {

      const imagesUrl = await Promise.all(
        req.files.map(async (item) => {
          const result = await cloudinary.uploader.upload(  item.path, { resource_type: "image", folder: `GroceryApp/${safeCategory}`}
          );
          return result.secure_url;
        })
      );

      updateData.image = imagesUrl;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      product
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};