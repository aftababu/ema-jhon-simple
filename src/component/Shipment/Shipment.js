import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import { clearTheCart, getStoredCart } from "../../utilities/fakedb";

function Shipment() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    const saveCart = getStoredCart()
    const orderDetails = { ...loggedInUser, products: saveCart, shipment: data, orderTime: new Date() }
    fetch(`http://localhost:4200/addOrder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    }).then(res => res.json()).then(data => {
      if (data) {
        clearTheCart()
        alert('Your alert placed successFully')
      }
    })

  };

  // console.log(watch("example")); // watch input value by passing the name of it
  console.log(loggedInUser.email, loggedInUser.displayName);
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="hook-form">
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue={loggedInUser?.displayName || loggedInUser?.name}
        placeholder="Name"
        name="name"
        {...register("name")}
      />
      {errors.name && <span>This field is required</span>}
      <input
        defaultValue={loggedInUser?.email}
        name="email"
        placeholder="email"
        {...register("email")}
      />
      {errors.email && <span>This field is required</span>}
      <input placeholder="Phone" {...register("phone")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("address", { required: true })}
        placeholder="address"
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
export default Shipment;
