import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Btn, Header, Input, SearchForm } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = evt => {
    this.setState({
      query: evt.target.value.trim().toLowerCase(),
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
    evt.target.reset();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <Btn type="submit">
            <FiSearch size={20} />
          </Btn>

          <Input
            type="text"
            autoComplete="off"
            name="query"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
