import React from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

const HomePage = () => {
  return (
    <div>
      HomePage
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
          <Button handler={() => console.log("Button clicked!")}>
            Default Button
          </Button>
          <Button
            outlined={true}
            handler={() => console.log("Button clicked!")}
          >
            Outlined Button
          </Button>
          <Button
            handler={() => console.log("Button clicked!")}
            type="submit"
            disabled={true}
          >
            Inactive button
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
