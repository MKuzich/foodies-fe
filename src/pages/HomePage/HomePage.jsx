import React from "react";
import {useDispatch} from 'react-redux'
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Categories from "@/components/Categories/Categories";
import Testimonials from "@/components/Testimonials/Testimonials";
import Recipes from "@/components/Recipes/Recipes";
import { selectedCategory } from "../../redux/categories/selectors";
import { useSelector } from "react-redux";
import {openSignIn, openSignUp, openLogout} from '../../redux/auth/authSlice';

const HomePage = () => {
  const isSelectedCategory = useSelector(selectedCategory);
  const  dispatch = useDispatch();

  return (
    <div>
        <nav>
      <button onClick={() => dispatch(openSignIn())}>Sign In</button>
        <button onClick={() => dispatch(openSignUp())}>Sign Up</button>
      <button onClick={() => dispatch(openLogout())}>Logout</button>
        
    </nav>
      {/* TODO: Delete example below, just show-case of using Button */}
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <h2>Example of using Button component in different variants</h2>
          <Button onClick={() => console.log("Button clicked!")}>
            Default Button
          </Button>
          <Button
            outlined={true}
            onClick={() => console.log("Button clicked!")}
          >
            Outlined Button
          </Button>
          <Button
            onClick={() => console.log("Button clicked!")}
            type="submit"
            inactive
          >
            Inactive button
          </Button>

        </div>

        {isSelectedCategory ?
            < Recipes /> 
            :
          <>
            <Categories />
            <Testimonials />
          </>}
      </Container>
    </div>
  );
};

export default HomePage;
