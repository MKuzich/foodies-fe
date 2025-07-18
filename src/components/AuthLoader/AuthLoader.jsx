import Container from "../Container/Container";
import css from "./AuthLoader.module.css";
const AuthLoader = () => {
  return (
    <Container>
      <div className={css.loaderWrapper}>
        <span className={css.loader}>Authenticating...</span>
      </div>
    </Container>
  );
};

export default AuthLoader;
