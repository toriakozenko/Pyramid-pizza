import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="5" y="272" rx="10" ry="10" width="260" height="23" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="420" rx="10" ry="10" width="107" height="30" />
    <rect x="129" y="412" rx="25" ry="25" width="152" height="45" />
    <rect x="3" y="2" rx="0" ry="0" width="260" height="260" />
  </ContentLoader>
);

export default Skeleton;
