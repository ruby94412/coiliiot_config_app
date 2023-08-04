import { logoPaths } from './pathConstants';

function Logo(props) {
  const { fill } = props;
  return (
    <svg width="78.000000pt" height="30.000000pt" viewBox="0 0 1317.000000 501.000000" {...props}>
      <g transform="translate(0.000000,501.000000) scale(0.100000,-0.100000)" fill={fill || 'white'}>
        {logoPaths.map(
          (path, idx) => (
            <path d={path} key={idx} />
          ),
        )}
      </g>
    </svg>
  );
}

export default Logo;
