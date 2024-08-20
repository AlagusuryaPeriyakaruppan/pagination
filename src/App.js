import { useEffect, useState } from "react";

const MAX_LIMIT = 20;

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${currentPage * 10 - 10}`
    );
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / MAX_LIMIT);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage !== currentPage &&
      selectedPage <= totalPages
    ) {
      setCurrentPage(selectedPage);
    }
  };

  const handlePrevious = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div>
      {products.length &&
        products.map((product) => {
          return (
            <div key={product.id} className="pagination__card">
              <img
                src={product.images[0]}
                alt={product.title}
                width={400}
                height={300}
              />
              <span>{product.title}</span>
            </div>
          );
        })}
      {products.length && (
        <div>
          {currentPage > 1 && (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {[...Array(Math.ceil(totalPages))].map((_, i) => (
            <span key={i} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </span>
          ))}

          {currentPage < totalPages && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
