import { FormEvent, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import TableTwo from '../../components/Tables/TableTwo';

const FormLayout = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ratingRate, setRatingRate] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const addProduct = (e: FormEvent) => {
    e.preventDefault();

    const productData = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rating: {
        rate: ratingRate,
        count: ratingCount
      }
    };

    fetch('https://epicbazaar.onrender.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added successfully:', data);
        // Clear input fields after successful addition
        setTitle('');
        setPrice(0);
        setDescription('');
        setCategory('');
        setImage('');
        setRatingRate(0);
        setRatingCount(0);
        // Show popup after adding product
        setShowPopup(true);
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Products 
              </h3>
            </div>
            <form onSubmit={addProduct}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Product title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} required
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Product price"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))} required
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    placeholder="Product description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} required
                  ></textarea>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Men's Clothing">Men's Clothing</option>
                    <option value="Women's Clothing">Women's Clothing</option>
                  </select>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Image URL
                  </label>
                  <input 
                    type="text"
                    placeholder="Paste your URL here"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Rating Rate
                  </label>
                  <input
                    type="number"
                    placeholder="Product rating rate"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required
                    value={ratingRate}
                    onChange={(e) => setRatingRate(parseFloat(e.target.value))}
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Rating Count
                  </label>
                  <input
                    type="number"
                    placeholder="Product rating count"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={ratingCount} required
                    onChange={(e) => setRatingCount(parseInt(e.target.value))}
                  />
                </div>
                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Product Added</h2>
            <button
              className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div style={{marginTop:"5%"}}>
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
