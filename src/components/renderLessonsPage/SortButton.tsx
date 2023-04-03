import "./sortButton.module.scss";
import {Fragment} from "react";
import classNames from "classnames";

type SortButtonPropd = {
  status: { name: string | undefined, class: string, method: string, status: string };
  object: { name: string, class: string, method: string, status: string }[];
  setNumberPage: (page: number) => void;
  setStatus: (val: { name: string, class: string, method: string, status: string }) => void;
  setLoading: (loading: boolean) => void;
};

export const SortButton = ({
  object, setLoading, status, setStatus, setNumberPage
}: SortButtonPropd) => {
  return (
    <Fragment>
      {object.length && object.map((value, index) =>
        <span
          key={index}
          className={classNames("sort__button", value.class,
            {[`${value.class}__status-active`]: status.name === value.name})}
          onClick={() => {
            setStatus(value);
            setNumberPage(1);
            setLoading(true);
          }}>
          {value.name}
        </span>
      )}
    </Fragment>
  );
};