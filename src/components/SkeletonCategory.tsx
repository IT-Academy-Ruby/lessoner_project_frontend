import ContentLoader from "react-content-loader";

const SkeletonCategory = () => (
  <ContentLoader className="skeleton"
    speed={2}
    width={320}
    height={240}
    viewBox="0 0 320 240"
    backgroundColor="#f5efef"
    foregroundColor="#faf5f5"
  >
    <rect x="7" y="275" rx="0" ry="0" width="50" height="0" /> 
    <rect x="31" y="236" rx="0" ry="0" width="0" height="1" /> 
    <rect x="0" y="0" rx="8" ry="8" width="320" height="240" />
  </ContentLoader>
);

export default SkeletonCategory;
