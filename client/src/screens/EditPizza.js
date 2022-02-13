import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzasById } from "../actions/pizzaActions";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import Success from "../components/Success";

export default function EditPizza({ match }) {
  const dispatch = useDispatch();
  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducers);
  const { pizza, error, loading } = getpizzabyidstate;
  const editPizzaState = useSelector((state) => state.editPizzaReducers);
  const { editsuccess, editerror, editloading } = editPizzaState;
  const [name, setName] = useState("");
  const [smallprice, setSmallPrice] = useState();
  const [mediumprice, setMediumPrice] = useState();
  const [largeprice, setLargePrice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (pizza) {
      if (pizza._id === match.params.pizzaid) {
        setName(pizza.name);
        setDescription(pizza.description);
        setCategory(pizza.category);
        setSmallPrice(pizza.prices[0]["small"]);
        setMediumPrice(pizza.prices[0]["medium"]);
        setLargePrice(pizza.prices[0]["large"]);
        setImage(pizza.image);
      } else {
        dispatch(getPizzasById(match.params.pizzaid));
      }
    } else {
      dispatch(getPizzasById(match.params.pizzaid));
    }
  }, [pizza, dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const UpdatePizza = {
      _id: match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };

    dispatch(editPizza(UpdatePizza));
  }
  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1>EditPizza</h1>
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editloading && <Loading />}
        {editsuccess && <Success success="Pizza Details Edited successfull" />}
        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="small varient price"
            value={smallprice}
            onChange={(e) => setSmallPrice(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="medium varient price"
            value={mediumprice}
            onChange={(e) => setMediumPrice(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="large varient price"
            value={largeprice}
            onChange={(e) => setLargePrice(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn mt-3" type="submit">
            Edit Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
