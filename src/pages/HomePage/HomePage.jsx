import React from "react";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Categories from "@/modules/categories/components/Categories/Categories";
import Testimonials from "@/modules/testimonials/components/Testimonials/Testimonials";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  return (
    <div>
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
          <Button onCLick={() => console.log("Button clicked!")}>
            Default Button
          </Button>
          <Button
            outlined={true}
            onCLick={() => console.log("Button clicked!")}
          >
            Outlined Button
          </Button>
          <Button
            onCLick={() => console.log("Button clicked!")}
            type="submit"
            inactive
          >
            Inactive button
          </Button>
        </div>
        <Categories />
        <Testimonials />
      </Container>
    </div>
  );
};

export default HomePage;
