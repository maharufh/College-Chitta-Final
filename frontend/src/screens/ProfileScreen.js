import React, { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import getError from "../utils";
import { toast } from "react-toastify";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_SUCCESS":
      return { ...state, loading: false };
    case "UPDATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const ProfileScreen = () => {
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(userInfo ? userInfo.image : null);
  const [newimage, setnewImage] = useState(null);
  const [location, setLocation] = useState("");

  const imageUpload = async () => {
    try {
      if (newimage) {
        const formDataImage = new FormData();
        formDataImage.append("image", newimage);
  
        const { data: { imageUrl } } = await axios.post("/api/upload", formDataImage);
        console.log(`imageUrl: ${imageUrl}`);
        setLocation(imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };

  const saveUserToDB = async (imageUrlFromUpload) => {
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
          image: imageUrlFromUpload,
        },
        {
          headers: {
            authorization: userInfo
              ? `Bearer ${userInfo.jwtToken}`
              : "razorpay",
          },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.scroll(0,0);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error occurred while saving user data to the database:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
   
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      let imageUrlFromUpload = "";
      if(newimage){

        imageUrlFromUpload  = await imageUpload();
        console.log(`image url after await is ${imageUrlFromUpload}`);
      }
      await saveUserToDB(imageUrlFromUpload)
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(err));
    }
  };
  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password (Old or New Password)</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageUpload">
          <Form.Label>Previous Profile Image</Form.Label>
          <div>
            <img src={userInfo.image} />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageUpload">
          <Form.Label>Upload Profile Photo (if you want to change)</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg, image/jpg"
            onChange={(e) => setnewImage(e.target.files[0])}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileScreen;
