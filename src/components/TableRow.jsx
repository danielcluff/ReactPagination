import PropTypes from 'prop-types';

export default function TableRow(props) {
  return (
    <tr className='text-gray-700 bg-transparent hover:bg-yellow-50 cursor-default duration-100'>
      <td className='px-6 h-12'>
        <img className='w-12' src={props.flagUrl} alt={`Flag of ${props.name}`} />
      </td>
      <td className='px-6 h-12'>{props.name}</td>
      <td className='px-6 h-12'>{props.capital}</td>
      <td className='px-6 h-12'>{props.language}</td>
    </tr>
  )
}

TableRow.defaultProps = {
  flagUrl: '',
  name: '',
  capital: '',
  language : ''
};

TableRow.propTypes = {
  flagUrl: PropTypes.string,
  name: PropTypes.string,
  capital: PropTypes.string,
  language: PropTypes.string
};
