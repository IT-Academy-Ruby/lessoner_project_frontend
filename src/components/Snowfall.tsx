import { THEME, useTheme } from "../utils/useTheme";
// eslint-disable-next-line object-curly-newline
import { useEffect, useRef, useState } from "react";
import ReactSnowfall from "react-snowfall";
import { useIdleTimer } from "react-idle-timer";

const IDLE_TIMEOUT_MS = 60 * 1000;
const NUMBER_OF_SNOWFLAKE_LOW = 40;
const NUMBER_OF_SNOWFLAKE_HIGHT = 400;
const SNOWFLAKE_RADIUSES_LOW: [number, number] = [0.5, 3];
const SNOWFLAKE_RADIUSES_HIGHT: [number, number] = [3, 7];
const SNOWFLAKE_COLOR_LIGHT_THEME = "#455FCE";
const SNOWFLAKE_COLOR_DARK_THEME = "white";

const SHOW_BG_AFTER_MS = 3 * 60 * 1000;
const BG_APPEAR_DELAY_MS = 60 * 1000;
const SHOW_LOGO_AFTER_MS = 4 * 60 * 1000;
const LOGO_APPEAR_DELAY_MS = 30 * 1000;
const SONG_APPEAR_AFTER_MS = 3.5 * 60 * 1000;
const SONG_APPEARING_MS = 15 * 1000;

interface SnowfallProps {
  setOpacity: (value: number) => void;
  setDisplay: (value: boolean) => void;
}

export function Snowfall({ setOpacity, setDisplay }: SnowfallProps) {
  const [ms, setMs] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setMs((value) => {
        if (value > SHOW_BG_AFTER_MS) {
          setDisplay(false);
        }

        if (
          value > SONG_APPEAR_AFTER_MS &&
          value <= SONG_APPEAR_AFTER_MS + SONG_APPEARING_MS
        ) {
          // console.log("play");
          if (audioRef.current) {
            try {
              if (audioRef.current.muted) {
                // audioRef.current.loop = true;
                audioRef.current.muted = false;
                audioRef.current.volume = 0;
                audioRef.current.play();
              } else {
                audioRef.current.volume = Math.min(
                  (value - SONG_APPEAR_AFTER_MS) / SONG_APPEARING_MS,
                  1
                );
              }
            } catch (e) {
              console.log("meh", e);
            }
          }
        }

        return value + 250;
      });
    }, 250);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIdleTimer({
    onActive: () => {
      setSnowflakeCount(NUMBER_OF_SNOWFLAKE_LOW);
      setSnowflakeRadiuses(SNOWFLAKE_RADIUSES_LOW);
      setOpacity(1);
      setMs(0);
      setDisplay(true);

      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.muted = true;
          audioRef.current.currentTime = 0;
        } catch (e) {
          console.log("meh 2", e);
        }
      }
    },
    onIdle: () => {
      setSnowflakeCount(NUMBER_OF_SNOWFLAKE_HIGHT);
      setSnowflakeRadiuses(SNOWFLAKE_RADIUSES_HIGHT);
      setOpacity(0.2);
    },
    timeout: IDLE_TIMEOUT_MS,
  });

  return (
    <>
      {ms > SHOW_BG_AFTER_MS ? (
        <div
          style={{
            position: "absolute",
            backgroundImage: "url(images/show-background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.5)",
            opacity: Math.min((ms - SHOW_BG_AFTER_MS) / BG_APPEAR_DELAY_MS, 1),
            zIndex: 10000,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <></>
      )}
      <ReactSnowfall
        style={{ zIndex: 10001 }}
        color={snowflakeColor}
        snowflakeCount={snowflakeCount}
        radius={snowflakeRadiuses}
        // wind
        // rotationSpeed
      />
      {ms > SHOW_LOGO_AFTER_MS ? (
        <div
          style={{
            position: "absolute",
            backgroundImage: "url(logo1440.svg)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: Math.min(
              (ms - SHOW_LOGO_AFTER_MS) / LOGO_APPEAR_DELAY_MS,
              1
            ),
            zIndex: 10002,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <></>
      )}

      {ms > SONG_APPEAR_AFTER_MS - 1000 ? (
        <audio
          ref={audioRef}
          id="notification"
          src="let-it-snow.mp3"
          autoPlay={true}
          muted
        />
      ) : (
        <></>
      )}
    </>
  );
}
