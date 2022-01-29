import React from 'react';
import Pagination from './Pagination';
import TableRow from './TableRow';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staticArray: [],
      alteredArray: [],
      itemsPerPage: 10,
    }
    this.handlePaginationParentUpdate = this.handlePaginationParentUpdate.bind(this);
    this.handleLanguageSelectRandomizer = this.handleLanguageSelectRandomizer.bind(this);
  }
    
  componentDidMount() {
    async function fetchAPI() {
        let response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('error', response.status)
        }
        let countries = await response.json();
        return countries;
    }
    fetchAPI().then(countries => this.setState({ staticArray: countries}));
  }

  handlePaginationParentUpdate(paginatedObjectArray) {
    this.setState({ alteredArray: paginatedObjectArray})
  }

  handleLanguageSelectRandomizer(languagesObject) {
    if (!languagesObject) return;
    // this is code I found on stack exchange
    // the restcountries API returns languages as an object with at least one language key which is an abbreviation of it's value
    // I only wanted to show one language so this picks a single value at random
    let keys = Object.keys(languagesObject);
    return languagesObject[keys[keys.length * Math.random() << 0]]
  }

  render() {
    return (
      <div className='mx-auto max-w-2xl bg-white rounded-none sm:shadow-lg sm:rounded-md border border-gray-300 overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='min-w-full overflow-x-auto divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr className='text-sm text-left text-gray-500 uppercase tracking-wider'>
                <th className='px-6 py-3'>Flag</th>
                <th className='px-6 py-3'>Country</th>
                <th className='px-6 py-3'>Capital</th>
                <th className='px-6 py-3'>Language</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {this.state.alteredArray.map(country => (
                <TableRow
                  key={country.name.common}
                  flagUrl={country.flags.png}
                  name={country.name.common}
                  capital={country.capital}
                  language={this.handleLanguageSelectRandomizer(country.languages)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          paginationParentUpdate={this.handlePaginationParentUpdate}
          objectArray={this.state.staticArray}
          itemsPerPage={this.state.itemsPerPage}
        />
      </div>
    )
  }
}
