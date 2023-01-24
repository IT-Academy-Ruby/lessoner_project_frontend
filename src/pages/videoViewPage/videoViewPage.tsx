import "./videoViewPage.scss";
import {
  Category,
  Lesson,
  categoriesUrl,
  lessonsUrl,
} from "../../components/body/content/lessons/Lessons";
import {useEffect, useState} from "react";
import {Published} from "../../components/LessonCard";
import RatingCounter from "../../components/ratingCounter/ratingCounter";
import {RootState} from "../../store";
import Tag from "../../components/body/Tags/Tag";
import {VideoPlayer} from "../../components/videoPlayer/videoPlayer";
import {VideoSideBar} from "../../../src/components/body/content/VideoSideBar/VideoSideBar";
import {connect} from "react-redux";
import img from "../../Photo.png"; // В качестве примера
import requestApi from "../../services/request";
import {useParams} from "react-router-dom";

interface CategoriesResponce {
  records: Category[];
  pagy_metadata: {
    count_pages: number;
    page: number;
    per_page: number;
  };
}

type BodyProps = {
  user?: {
    id: number;
    name: string;
  };
};

const VideoViewPage = ({user}: BodyProps) => {
  const [currentLessonId, setCurrentLessonId] = useState<string | undefined>(useParams().id);
  const [lessonData, setLessonData] = useState<Lesson>();
  const [lessonCategoryId, setLessonCategoryId] = useState<number>();
  const [lessonsArr, setLessonsArr] = useState<Lesson[]>([]);
  const [newLessonsArr, setNewLessonsArr] = useState<Lesson[]>([]);
  const [popularLessonsArr, setPopularLessonsArr] = useState<Lesson[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoriesNames, setCategoriesNames] = useState<Category[]>();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [isRatingFrozen, setIsRatingFrozen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [rating, setRating] = useState<undefined | number>();

  const [isViewed, setIsViewed] = useState(false);

  useEffect(() => {
    // Get lessonData from lessonId
    const fetchSuccess = (data: Lesson) => {
      setLessonData(data);
      setLessonCategoryId(data.category_id);
      setUserRating(data.user_rating || 0);
    };
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };
    const fetchData = async () => {
      const response = await requestApi(lessonsUrl + "/" + currentLessonId, "GET");

      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        const data = await response.json();
        fetchSuccess(data);
      }
    };
    fetchData();
  }, [currentLessonId]);


  useEffect(() => {
    //Get lessonsArr from CategoryId
    if (!lessonsArr.length && lessonCategoryId) {
      const fetchSuccess = (data: Lesson[]) => {
        setLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&category_id=${lessonCategoryId}`,
          "GET"
        );
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data.records);
        }
      };
      fetchData();
    }
  }, [lessonsArr, lessonCategoryId, currentLessonId]);

  useEffect(() => {
    //Get  Array sorted by newest
    if (!newLessonsArr.length) {
      const fetchSuccess = (data: Lesson[]) => {
        setNewLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&sort_field=created_at`,
          "GET"
        );
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data.records);
        }
      };
      fetchData();
    }
  }, [newLessonsArr]);
  useEffect(() => {
    //Get  Array sorted by popular
    if (!popularLessonsArr.length) {
      const fetchSuccess = (data: Lesson[]) => {
        setPopularLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&sort_field=views_count`,
          "GET"
        );
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data.records);
        }
      };
      fetchData();
    }
  }, [popularLessonsArr]);

  useEffect(() => {
    //Get CategoryName from CategoryId
    if (lessonCategoryId) {
      const fetchSuccess = (data: CategoriesResponce) => {
        const categoryName = data.records.find(
          (elem) => elem.id === lessonCategoryId
        )?.name;
        if (categoryName) setCategoryName(categoryName);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      if (!categoriesNames) {
        const fetchData = async () => {
          const response = await requestApi(categoriesUrl, "GET");
          if (!response.ok) {
            fetchError("fetch error " + response.status);
          } else {
            const data = await response.json();
            fetchSuccess(data);
          }
        };
        fetchData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonCategoryId]);

  useEffect(() => {
    //Get CategoriesNames
    const fetchSuccess = (data: CategoriesResponce) => {
      setCategoriesNames(data.records);
    };
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };

    const fetchData = async () => {
      const response = await requestApi(categoriesUrl, "GET");
      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        const data = await response.json();
        fetchSuccess(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categoriesNames && lessonCategoryId) {
      const fetchSuccess = (data: CategoriesResponce) => {
        const categoryName = data.records.find(
          (elem) => elem.id === lessonCategoryId
        )?.name;
        if (categoryName) {
          setCategoryName(categoryName);
        }
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };

      const fetchData = async () => {
        const response = await requestApi(categoriesUrl, "GET");
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data);
        }
      };
      fetchData();
    }
  }, [categoriesNames, lessonCategoryId]);

  useEffect(() => {
    if (categoryName) {
      const fetchSuccess = (data: Lesson[]) => {
        setLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&category_id=${lessonCategoryId}`,
          "GET"
        );
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data.records);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  useEffect(() => {
    const fetchSuccess = (data: Lesson) => {
      setRating(data.rating);
    };
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };

    const fetchData = async () => {
      const response = await requestApi(lessonsUrl + "/" + currentLessonId);
      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        const data = await response.json();
        fetchSuccess(data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsAuthorized(!!user?.id);
  }, [user]);

  const changeIdState = (id: number) => {
    setCurrentLessonId(String(id));
  };
  const getNewRating = (rating: number) => {
    setIsRatingFrozen(true);
    setUserRating(rating);

    const fetchSuccess = (data: Lesson) => {
      setRating(data.rating);
      setLessonData(data);
      setIsRatingFrozen(false);
    };
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };

    const fetchData = async () => {
      const response = await requestApi(lessonsUrl + "/" + currentLessonId, "PUT", {rating,});
      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        const data = await response.json();
        fetchSuccess(data);
      }
    };
    fetchData();
  };

  const addViewer = () => {
    setIsViewed(true);
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };
    const fetchData = async () => {
      // eslint-disable-next-line max-len
      const response = await requestApi(
        `${process.env.REACT_APP_BACKEND_URL}/add_lesson_view`,
        "POST",
        {lesson_id: currentLessonId}
      );
      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        return;
      }
    };
    fetchData();
  };

  const sideBarTabs = [
    {
      label: categoryName,
      id: 1,
      data: lessonsArr,
    },
    {
      label: "New",
      id: 2,
      data: newLessonsArr,
    },
    {
      label: "Popular",
      id: 3,
      data: popularLessonsArr,
    },
  ];

  if (
    !currentLessonId ||
    !lessonData ||
    !lessonsArr ||
    !newLessonsArr ||
    !popularLessonsArr ||
    !sideBarTabs ||
    rating === undefined
  ) {
    return null;
  }

  return (
    <div className="video__page_wrapper">
      <div className="videoplayer__wrapper">
        <VideoPlayer
          src={lessonData.video_link}
          onClick={() => {!isViewed && addViewer();}}
          previewImg={lessonData.image_link}
        />
        <div className="videoplayer__wrapper__info">
          <div className="videoplayer__wrapper__info_top">
            <div className="info__top_left">
              <img src={lessonData.author_avatar_url ?? img}></img>
              <div className="info__top_left_text">
                <h2>{lessonData.title}</h2>
                <span>{lessonData.author_name}</span>
              </div>
            </div>
            <div className="info__top_right">
              <RatingCounter
                globalRating={rating}
                userRating={userRating}
                totalVotes={lessonData.votes_count}
                onRatingSet={isAuthorized ? getNewRating : undefined}
                isDisabled={!isAuthorized || isRatingFrozen}
              />
            </div>
          </div>
          <div className="videoplayer__wrapper__info_bottom">
            <Tag
              className={"videoplayer__wrapper__label"}
              type="category"
              text={categoryName}
            />
            <div className="published__views_wrapper">
              <Published
                published={lessonData.created_at}
                className="videoplayer__wrapper__published"
              />
              <div className="videoplayer__wrapper__views">
                <span>{`${lessonData.views_count} views`}</span>
              </div>
            </div>
            <div className="videoplayer__wrapper__description">
              <span>{lessonData.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="video__side_bar">
        <VideoSideBar tabs={sideBarTabs} changeIdState={changeIdState}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {user: state?.login?.user};
};

export default connect(mapStateToProps)(VideoViewPage);
