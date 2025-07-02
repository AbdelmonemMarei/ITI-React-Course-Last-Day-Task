// author -> Abdelmonem Mahmoud Marei
// github -> https://github.com/AbdelmonemMarei

import React, { useEffect, useMemo } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { PulseLoader } from 'react-spinners'

function Home() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [products, setProducts] = React.useState([])
  const [loader, setloader] = React.useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('https://fakestoreapi.com/products');
        if (response.status != 200) throw new Error("something went wrong while fetching data");
        const data = await response.data
        setProducts(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setloader(false)
      }
    };
    fetchData();
  }, [products])

  const filteredProducts = useMemo(() => {
    const filteredProductsMemo = products.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    return filteredProductsMemo
  }, [products, searchTerm])
  return (
    <div>
      <div className='container'>
        <h2 className='my-4 fw-bold text-center'>Products</h2>
        <input className='form-control mb-4' placeholder='Search...' onChange={(e) => setSearchTerm(e.target.value)}/>
        <div className='row justify-content-between align-items-center'>{
          loader?
          <div className='col-12 w-100 d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
             <PulseLoader color='#FE7743' />
          </div>
          :
          filteredProducts.map((product) => (
            <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={product.id}>
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
  </div>
  )
}

export default Home
