import "./PopupMenu.scss";
import { useEffect, useRef } from "react";

type PopupMenuProps = {
  items?: {
    label: string;
    url: string;
    id: number;
  }[];
  isOpen?: boolean;
  onClickOutside?: () => void;
};

export const PopupMenu = (props: PopupMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, onClickOutside, items = [] } = props;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickOutside]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup" ref={ref}>
      <div className="popup__window">
        <div className="popup__content">
          {items.map((item) => {
            const { label, url, id } = item;
            return (
              <a href={url} key={id}>
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
