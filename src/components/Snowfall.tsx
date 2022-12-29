import { THEME, useTheme } from "../utils/useTheme";
import { useEffect, useState } from "react";
import ReactSnowfall from "react-snowfall";
import { useIdleTimer } from "react-idle-timer";

const IDLE_TIMEOUT_MS = 60 * 1000;
const NUMBER_OF_SNOWFLAKE_LOW = 40;
const NUMBER_OF_SNOWFLAKE_HIGHT = 400;
const SNOWFLAKE_RADIUSES_LOW: [number, number] = [0.5, 3];
const SNOWFLAKE_RADIUSES_HIGHT: [number, number] = [3, 7];
const SNOWFLAKE_COLOR_LIGHT_THEME = "#455FCE";
const SNOWFLAKE_COLOR_DARK_THEME = "white";

interface SnowfallProps {
  setOpacity: (value: number) => void;
}

export function Snowfall({ setOpacity }: SnowfallProps) {
  const theme = useTheme();

  const [snowflakeCount, setSnowflakeCount] = useState(NUMBER_OF_SNOWFLAKE_LOW);
  // eslint-disable-next-line max-len
  const [snowflakeRadiuses, setSnowflakeRadiuses] = useState<[number, number]>(
    SNOWFLAKE_RADIUSES_LOW
  );
  const [snowflakeColor, setSnowflakeColor] = useState(
    SNOWFLAKE_COLOR_LIGHT_THEME
  );

  useEffect(() => {
    if (theme === THEME.LIGHT) {
      setSnowflakeColor(SNOWFLAKE_COLOR_LIGHT_THEME);
    } else {
      setSnowflakeColor(SNOWFLAKE_COLOR_DARK_THEME);
    }
  }, [theme]);

  useIdleTimer({
    onActive: () => {
      setSnowflakeCount(NUMBER_OF_SNOWFLAKE_LOW);
      setSnowflakeRadiuses(SNOWFLAKE_RADIUSES_LOW);
      setOpacity(1);
    },
    onIdle: () => {
      setSnowflakeCount(NUMBER_OF_SNOWFLAKE_HIGHT);
      setSnowflakeRadiuses(SNOWFLAKE_RADIUSES_HIGHT);
      setOpacity(0.2);
    },
    timeout: IDLE_TIMEOUT_MS,
  });

  return (
    <ReactSnowfall
      color={snowflakeColor}
      snowflakeCount={snowflakeCount}
      radius={snowflakeRadiuses}
      // wind
      // rotationSpeed
    />
  );
}
