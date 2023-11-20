import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImg } from './api';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    totalHits: 0,
  };

  handleSubmit = query => {
    this.setState({
      page: 1,
      query: query,
      images: [],
      totalHits: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    console.log(page);
    console.log(query);

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const data = await fetchImg(query, page);
        const { totalHits, hits } = data;
        if (totalHits === 0) {
          toast.error(`There are no pictures for your search`);
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits: totalHits,
        }));
      } catch (error) {
        toast.error(`Try to reload page`);
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  render() {
    const { handleSubmit, handleLoadMore } = this;
    const { images, loading, totalHits } = this.state;
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {images.length > 0 && images.length < totalHits && (
          <Button onClick={handleLoadMore} />
        )}
        <Toaster position="top-right" />
      </div>
    );
  }
}
