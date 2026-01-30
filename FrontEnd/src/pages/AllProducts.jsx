import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    
    const {products, searchQuery}=useAppContext();
    const [filteredProducts, setFilteredProducts]=useState([]);

    useEffect(()=>{
        if(searchQuery.length > 0){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFilteredProducts(products.filter(
                product=>product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))}
            else{
                setFilteredProducts(products)
            }
        }, [products,searchQuery])

        const inStockProducts = filteredProducts.filter((p) => p.inStock);

  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>

        {searchQuery.length > 0 && inStockProducts.length === 0 ? (
        <p className="mt-10 text-center text-gray-500 text-lg">
            Item not found 
        </p>
        ):(
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
            {filteredProducts.filter((product)=>product.inStock).map((product, index)=>(
                <ProductCard key={index} product={product}/>
            ))}
        </div>
    )}
    </div>
  )
}

export default AllProducts
