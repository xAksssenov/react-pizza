import ContentLoader, { IContentLoaderProps } from "react-content-loader";
import { JSX } from "react/jsx-runtime";

const Skeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="296" rx="15" ry="15" width="280" height="25" />
    <rect x="4" y="423" rx="15" ry="15" width="95" height="30" />
    <rect x="-1" y="338" rx="15" ry="15" width="280" height="70" />
    <circle cx="136" cy="125" r="125" />
    <rect x="135" y="419" rx="25" ry="25" width="140" height="40" />
  </ContentLoader>
);

export default Skeleton;
