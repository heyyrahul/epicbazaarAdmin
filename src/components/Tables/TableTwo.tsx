import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const TableTwo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const productsPerPage: number = 8;

  useEffect(() => {
    fetch('https://epicbazaar.onrender.com/products')
      .then(response => response.json())
      .then((data: Product[]) => {
        // Modify the structure of each product to include price and quantity
        const modifiedData = data.map(product => ({
          ...product,
          price: parseFloat(product.price.toFixed(2)), // Round price to 2 decimal places and convert to number
          quantity: product.rating.count // Assign count as quantity
        }));
        setProducts(modifiedData);
        setSortedProducts(modifiedData);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    sortProducts(sortBy);
  }, [sortBy]);

  useEffect(() => {
    setSortedProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const sortProducts = (sortBy: string) => {
    let sorted: Product[];
    if (sortBy === 'price-low-to-high') {
      sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-to-low') {
      sorted = [...sortedProducts].sort((a, b) => b.price - a.price);
    } else {
      sorted = [...products];
    }
    setSortedProducts(sorted);
  };

  const filterProducts = (category: string) => {
    setFilterCategory(category);
    if (category === '') {
      setSortedProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setSortedProducts(filtered);
    }
  };

  const removeProduct = (id: number) => {
    fetch(`https://epicbazaar.onrender.com/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update products state by removing the deleted product
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        setSortedProducts(prevSortedProducts => prevSortedProducts.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };
  
  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">All Products</h4>
        <div className="flex items-center mt-4">
          <input style={{color:"black"}}
            type="text"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <select style={{color:"black"}}
            value={filterCategory}
            onChange={(e) => filterProducts(e.target.value)}
            className="ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
          </select>
          <select
            value={sortBy} style={{color:"black"}}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Sort By</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 flex items-center" style={{marginLeft:"150px"}}>
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center" style={{marginLeft:"160px"}}>
          <p className="font-medium">Quantity</p>
        </div>
        <div className="col-span-1 flex items-center" style={{marginLeft:"200px",width:"150px"}} >
          <p className="font-medium">Delete Products</p>
        </div>
      </div>

      {currentProducts.map(product => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={product.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex items-center">
              <img src={product.image} alt={product.title} className="h-10 w-10 mr-2 rounded-full" />
              <p className="text-sm text-black dark:text-white">{product.title}</p>
            </div>
          </div>
          <div className="col-span-1 flex items-center" style={{marginLeft:"150px"}}>
            <p className="text-sm text-black dark:text-white">{product.price}</p>
          </div>
          <div className="col-span-1 flex items-center" style={{marginLeft:"180px"}}>
            <p className="text-sm text-black dark:text-white">{product.rating.count}</p>
          </div>
          <div className="col-span-1 flex items-center" style={{marginLeft:"200px"}}>
            <button
              onClick={() => removeProduct(product.id)}
              className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="">
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, index) => (
              <li key={index} className="mx-1">
                <button
                  className={`${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                  } font-semibold py-2 px-4 border border-gray-300 rounded hover:bg-blue-200 focus:outline-none focus:bg-blue-200 transition-colors duration-300`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableTwo;
