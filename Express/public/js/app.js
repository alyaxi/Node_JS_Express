const App = () => {
  const [products, setProducts] = React.useState([]);
  const [form, setForm] = React.useState({
    name: "",
    price: "",
  });



  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    // console.log(data);
    setProducts(data);
  };



  const handleForm = (event, field) => {
    if (field === "name") {
      setForm({
        ...form,
        name: event.target.value,
      });
    } else if (field === "price") {
      setForm({
        ...form,
        price: event.target.value,
      });
    }
    // console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name === "" || form.price === "") {
      alert("Please fill all the fields");
    }else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).then(res => res.json()).then(data => {
        fetchProducts()
        setForm({
          name: "",   
          price: ""
        })
      })
      
  } };

  const handleDelete = async (id) => {
    console.log(id);
   await fetch(`/api/products/${id}`, {
      method: "DELETE",
    }).then(res => res.json()).then(data => {
      fetchProducts()
      alert("Product deleted successfully")
    }).catch(err => console.log(err))
  }

 
  return (
    <>
      <div className="card" >
        <div className="card-header">Add Products</div>
    
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Product Name:
              </label>
              <input
                onChange={(event) => handleForm(event, "name")}
                value={form.name}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                style={{ width: "100%" }}
              />
            </li>
            <li className="list-group-item">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Price:
              </label>
              <input
                onChange={(event) => handleForm(event, "price")}
                value={form.price}
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                style={{ width: "100%" }}
              />
              <button
            onClick={handleSubmit}
            className="btn btn-primary align-items-center ml-3 mt-4 mb-4 "
               >
            Add a Product
          </button>
            </li>
          
          </ul>
        
      </div>
      <ul className="list-group mt-4">
        {products.map((product, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center "
            aria-current="true"
          >
            <div>
              <strong>
                {" "}
                {product.name}: ${product.price}
              </strong>
            </div>
            <button className="btn btn-primary " onClick={() => {handleDelete(product.id)}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
