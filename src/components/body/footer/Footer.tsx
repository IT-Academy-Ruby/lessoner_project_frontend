import "./footer.scss";
import { lessonerLink, startLink } from "../../../store/links/linksSlise";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import ThemeBtn from "../../ThemeBtn";
import { nameDecodedUser } from "../../../store/header/decodeJwtSlice";
import { useEffect } from "react";

const Footer = () => {
  const decodeUserName = useAppSelector(
    (state) => state.userDecodedName.session.name
  );
  const lessoner = useAppSelector((state) => state.link.lessoner);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(nameDecodedUser());
    if (decodeUserName) {
      dispatch(lessonerLink());
    } else {
      dispatch(startLink());
    }
  }, [decodeUserName, dispatch]);

  return (
    <footer className="footer">
      <Link to={lessoner}>
        <div>
          <FormattedMessage id="app.name" />
        </div>
      </Link>
      <Link to="/categories">
        <div>
          <FormattedMessage id="app.categories" />
        </div>
      </Link>
      <Link to="/lessons">
        <div>
          <FormattedMessage id="app.lessons" />
        </div>
      </Link>
      <Link to="/about">
        <div>
          <FormattedMessage id="app.about" />
        </div>
      </Link>
      <ThemeBtn />
    </footer>
  );
};

export default Footer;
