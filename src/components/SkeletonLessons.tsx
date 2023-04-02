import ContentLoader from "react-content-loader";

const SkeletonLessons = () => (
  <ContentLoader className="skeleton"
    speed={2}
    width={317}
    height={288}
    backgroundColor="#f5efef"
    foregroundColor="#faf5f5"
  >
    <rect x="1" y="1" rx="8" ry="8" width="317" height="288" />
  </ContentLoader>
);

export default SkeletonLessons;
