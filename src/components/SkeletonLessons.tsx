import ContentLoader from "react-content-loader";

const SkeletonLessons = () => (
  <ContentLoader className="skeleton"
    speed={2}
    width={300}
    height={310}
    viewBox="0 0 300 310"
    backgroundColor="#f5efef"
    foregroundColor="#faf5f5"
  >
    <rect x="16" y="16" rx="8" ry="8" width="284" height="290" />
  </ContentLoader>
);

export default SkeletonLessons;
